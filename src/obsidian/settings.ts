export interface SwipeWordsPluginSettings {
  // column: this will be data to show if the file has been memorized.
  column: string;

  // // tag: app search files by the tag
  // tag: string;

  // quizzDirectory: directory that quizz files are stored.
  quizzDirectory: string;
}

export const DEFAULT_SETTINGS: Partial<SwipeWordsPluginSettings> = {
  column: "done",
}

type Self = SwipeWordsPluginSettings;
export const SwipeWordsPluginSettings = {
  is: (self: Partial<Self>): self is Self =>
    (self.column ?? "") !== ""
    && (self.quizzDirectory ?? "") !== ""
} as const;


