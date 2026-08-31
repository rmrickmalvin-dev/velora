import {
  execFileSync,
} from "node:child_process";
import {
  existsSync,
  readFileSync,
} from "node:fs";
import process from "node:process";

const args =
  new Set(
    process.argv.slice(2),
  );

const requirements = {
  clean:
    args.has(
      "--require-clean",
    ),
  origin:
    args.has(
      "--require-origin",
    ),
  remote:
    args.has(
      "--require-remote",
    ),
  upstream:
    args.has(
      "--require-upstream",
    ),
};

const failures = [];
const pending = [];

function log(
  status,
  label,
  detail,
) {
  console.log(
    `[${status}] ${label}: ${detail}`,
  );
}

function pass(
  label,
  detail,
) {
  log(
    "PASS",
    label,
    detail,
  );
}

function wait(
  label,
  detail,
) {
  pending.push(
    `${label}: ${detail}`,
  );

  log(
    "WAIT",
    label,
    detail,
  );
}

function fail(
  label,
  detail,
) {
  failures.push(
    `${label}: ${detail}`,
  );

  log(
    "FAIL",
    label,
    detail,
  );
}

function read(
  path,
) {
  return readFileSync(
    path,
    "utf8",
  );
}

function git(
  commandArgs,
) {
  try {
    return execFileSync(
      "git",
      commandArgs,
      {
        encoding:
          "utf8",
        stdio: [
          "ignore",
          "pipe",
          "ignore",
        ],
      },
    ).trim();
  } catch {
    return null;
  }
}

function currentNpmVersion() {
  const npmExecPath =
    process.env
      .npm_execpath;

  if (!npmExecPath) {
    return null;
  }

  try {
    return execFileSync(
      process.execPath,
      [
        npmExecPath,
        "--version",
      ],
      {
        encoding:
          "utf8",
      },
    ).trim();
  } catch {
    return null;
  }
}

function validateOrigin(
  value,
) {
  try {
    const url =
      new URL(
        value,
      );

    if (
      url.protocol !==
        "http:" &&
      url.protocol !==
        "https:"
    ) {
      return {
        ok: false,
        reason:
          "origin must use HTTP or HTTPS",
      };
    }

    const host =
      url.hostname
        .toLowerCase();

    if (
      host ===
        "localhost" ||
      host ===
        "127.0.0.1" ||
      host ===
        "0.0.0.0" ||
      host ===
        "::1" ||
      host ===
        "example.com" ||
      host.endsWith(
        ".example.com",
      ) ||
      host.endsWith(
        ".example",
      ) ||
      host.endsWith(
        ".invalid",
      )
    ) {
      return {
        ok: false,
        reason:
          "origin cannot use localhost or a placeholder host",
      };
    }

    return {
      ok: true,
      origin:
        url.origin,
    };
  } catch {
    return {
      ok: false,
      reason:
        "origin is not a valid absolute URL",
    };
  }
}

console.log(
  "VELORA BUILD 06 RELEASE READINESS",
);

const packageJson =
  JSON.parse(
    read(
      "package.json",
    ),
  );

const nvmVersion =
  read(
    ".nvmrc",
  ).trim();

const nodeVersion =
  process.version
    .replace(
      /^v/,
      "",
    );

if (
  nodeVersion ===
  nvmVersion
) {
  pass(
    "Node",
    nodeVersion,
  );
} else {
  fail(
    "Node",
    `expected ${nvmVersion}, found ${nodeVersion}`,
  );
}

const npmVersion =
  currentNpmVersion();

if (
  npmVersion ===
  "11.6.2"
) {
  pass(
    "npm",
    npmVersion,
  );
} else if (
  npmVersion
) {
  fail(
    "npm",
    `expected 11.6.2, found ${npmVersion}`,
  );
} else {
  fail(
    "npm",
    "could not resolve npm version from npm_execpath",
  );
}

if (
  packageJson.private ===
  true
) {
  pass(
    "Package privacy",
    "private=true",
  );
} else {
  fail(
    "Package privacy",
    "portfolio application must remain private from npm publishing",
  );
}

if (
  packageJson.scripts?.[
    "quality"
  ] ===
  "npm run check && npm run test:e2e"
) {
  pass(
    "Quality gate",
    packageJson.scripts[
      "quality"
    ],
  );
} else {
  fail(
    "Quality gate",
    "canonical quality script changed unexpectedly",
  );
}

const envExample =
  read(
    ".env.example",
  );

if (
  /^NEXT_PUBLIC_SITE_URL=$/m
    .test(
      envExample,
    ) &&
  !/^NEXT_PUBLIC_SITE_URL=https?:\/\//m
    .test(
      envExample,
    )
) {
  pass(
    "Environment template",
    "production origin has no invented default",
  );
} else {
  fail(
    "Environment template",
    "NEXT_PUBLIC_SITE_URL must remain blank in .env.example",
  );
}

if (
  existsSync(
    ".gitattributes",
  ) &&
  read(
    ".gitattributes",
  ).includes(
    "* text=auto eol=lf",
  )
) {
  pass(
    "Line endings",
    "repository text policy is LF",
  );
} else {
  fail(
    "Line endings",
    "repository LF policy is missing",
  );
}

const origin =
  process.env
    .NEXT_PUBLIC_SITE_URL
    ?.trim();

if (!origin) {
  if (
    requirements.origin
  ) {
    fail(
      "Production origin",
      "NEXT_PUBLIC_SITE_URL is required for deploy-check",
    );
  } else {
    wait(
      "Production origin",
      "NEXT_PUBLIC_SITE_URL will be supplied by the real deployment",
    );
  }
} else {
  const result =
    validateOrigin(
      origin,
    );

  if (result.ok) {
    pass(
      "Production origin",
      result.origin,
    );
  } else {
    fail(
      "Production origin",
      result.reason,
    );
  }
}

const remotes =
  git(
    [
      "remote",
    ],
  );

if (remotes) {
  pass(
    "Git remote",
    remotes
      .split(
        /\r?\n/,
      )
      .join(
        ", ",
      ),
  );
} else if (
  requirements.remote
) {
  fail(
    "Git remote",
    "no remote configured",
  );
} else {
  wait(
    "Git remote",
    "repository destination has not been configured",
  );
}

const upstream =
  git(
    [
      "rev-parse",
      "--abbrev-ref",
      "--symbolic-full-name",
      "@{u}",
    ],
  );

if (upstream) {
  pass(
    "Branch upstream",
    upstream,
  );
} else if (
  requirements.upstream
) {
  fail(
    "Branch upstream",
    "current branch has no upstream",
  );
} else {
  wait(
    "Branch upstream",
    "will exist after the repository remote is connected and pushed",
  );
}

const gitStatus =
  git(
    [
      "status",
      "--porcelain",
      "--untracked-files=all",
    ],
  );

if (!gitStatus) {
  pass(
    "Working tree",
    "clean",
  );
} else if (
  requirements.clean
) {
  fail(
    "Working tree",
    "release deploy-check requires a clean tree",
  );
} else {
  wait(
    "Working tree",
    "implementation changes are currently uncommitted",
  );
}

const deployConfigs =
  [
    "vercel.json",
    "netlify.toml",
    "wrangler.toml",
    "firebase.json",
    ".firebaserc",
    ".github/workflows/deploy.yml",
    ".github/workflows/pages.yml",
  ].filter(
    existsSync,
  );

if (
  deployConfigs.length ===
  0
) {
  wait(
    "Deploy provider",
    "provider-neutral Release Candidate; select provider only with real deployment intent",
  );
} else {
  pass(
    "Deploy provider config",
    deployConfigs.join(
      ", ",
    ),
  );
}

if (
  failures.length >
  0
) {
  console.error(
    "",
  );
  console.error(
    "RELEASE READINESS: BLOCKED",
  );

  for (
    const failure
    of failures
  ) {
    console.error(
      `- ${failure}`,
    );
  }

  process.exit(
    1,
  );
}

if (
  pending.length >
  0
) {
  console.log(
    "",
  );
  console.log(
    "LOCAL RELEASE CANDIDATE: READY",
  );
  console.log(
    "External release inputs remain pending:",
  );

  for (
    const item
    of pending
  ) {
    console.log(
      `- ${item}`,
    );
  }

  process.exit(
    0,
  );
}

console.log(
  "",
);
console.log(
  "RELEASE READINESS: READY",
);