import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import ts from "typescript";

const source = await readFile(
  new URL("../src/lib/youtube-live.ts", import.meta.url),
  "utf8",
);
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
});
const {
  buildYoutubeEmbedUrl,
  getYoutubeLiveHeroState,
  shouldStartHeaderCollapsed,
} = await import(
  `data:text/javascript;charset=utf-8,${encodeURIComponent(outputText)}`
);

test("buildYoutubeEmbedUrl converts YouTube watch URLs to autoplay embed URLs", () => {
  assert.equal(
    buildYoutubeEmbedUrl("https://www.youtube.com/watch?v=abcdefghijk"),
    "https://www.youtube.com/embed/abcdefghijk?autoplay=1&mute=1&rel=0",
  );
});

test("getYoutubeLiveHeroState shows a schedule notice when live is active without a link", () => {
  assert.deepEqual(getYoutubeLiveHeroState({ isActive: true, youtubeUrl: "   " }), {
    mode: "notice",
    message: "14:00부터 온라인 컨퍼런스가 진행 됩니다.",
  });
});

test("getYoutubeLiveHeroState hides the live hero when live is inactive", () => {
  assert.deepEqual(getYoutubeLiveHeroState({ isActive: false, youtubeUrl: "" }), {
    mode: "off",
  });
});

test("shouldStartHeaderCollapsed starts collapsed only while the live hero is active", () => {
  assert.equal(
    shouldStartHeaderCollapsed(getYoutubeLiveHeroState({ isActive: true, youtubeUrl: "" })),
    true,
  );
  assert.equal(
    shouldStartHeaderCollapsed(
      getYoutubeLiveHeroState({
        isActive: true,
        youtubeUrl: "https://www.youtube.com/watch?v=abcdefghijk",
      }),
    ),
    true,
  );
  assert.equal(
    shouldStartHeaderCollapsed(getYoutubeLiveHeroState({ isActive: false, youtubeUrl: "" })),
    false,
  );
});
