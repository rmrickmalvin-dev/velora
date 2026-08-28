import {
  defineConfig,
  devices,
} from "@playwright/test";

export default defineConfig({
  testDir:
    "./e2e",
  fullyParallel:
    false,
  forbidOnly:
    Boolean(
      process.env.CI,
    ),
  retries:
    process.env.CI
      ? 2
      : 0,
  workers:
    process.env.CI
      ? 1
      : undefined,
  reporter:
    "list",
  use: {
    baseURL:
      "http://127.0.0.1:3100",
    trace:
      "retain-on-failure",
    screenshot:
      "only-on-failure",
  },
  projects: [
    {
      name:
        "chromium",
      use: {
        ...devices[
          "Desktop Chrome"
        ],
      },
    },
  ],
  webServer: {
    command:
      "npx next dev -p 3100",
    url:
      "http://127.0.0.1:3100/pt-BR",
    reuseExistingServer:
      !process.env.CI,
    timeout:
      120_000,
  },
});