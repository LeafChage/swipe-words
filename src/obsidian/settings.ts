export interface SwipeWordsPluginSettings {
  // // tag: app search files by the tag
  // tag: string;

  // quizzDirectory: directory that quizz files are stored.
  quizzDirectory: string;
}

export const DEFAULT_SETTINGS: Partial<SwipeWordsPluginSettings> = {}

type Self = SwipeWordsPluginSettings;
export const SwipeWordsPluginSettings = {
  is: (self: Partial<Self>): self is Self =>
    (self.quizzDirectory ?? "") !== ""
} as const;


