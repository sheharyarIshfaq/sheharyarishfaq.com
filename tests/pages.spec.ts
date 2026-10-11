import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routes } from "../src/lib/routes";

const widths = [375, 768, 1440];
const themes = ["light", "dark"] as const;
const paths = routes.map((route) => route.path);

function fileName(path: string) {
  return path === "/" ? "home" : path.slice(1).replace(/\//g, "-");
}

for (const path of paths) {
  for (const theme of themes) {
    test.describe(`${path} (${theme})`, () => {
      // Reduced motion puts every figure in its final state, so screenshots are stable.
      test.use({ colorScheme: theme, reducedMotion: "reduce" });

      for (const width of widths) {
        test(`${width}px`, async ({ page }) => {
          await page.setViewportSize({ width, height: 900 });
          await page.goto(path);
          await page.evaluate(() => document.fonts.ready);

          await page.screenshot({
            path: `test-results/screenshots/${fileName(path)}-${theme}-${width}.png`,
            fullPage: true,
          });

          const { violations } = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
            .analyze();
          expect(violations.map((violation) => `${violation.id}: ${violation.help} (${violation.nodes.map((node) => node.target.join(" ")).join(", ")})`)).toEqual([]);
        });
      }
    });
  }
}
