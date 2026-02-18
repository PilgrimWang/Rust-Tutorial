const DEFAULT_MAX_URL_LENGTH = 8000;

export type RustPlaygroundVersion = "stable" | "beta" | "nightly";
export type RustPlaygroundMode = "debug" | "release";
export type RustPlaygroundEdition = "2018" | "2021" | "2024";

export interface RustPlaygroundUrlOptions {
  version?: RustPlaygroundVersion;
  mode?: RustPlaygroundMode;
  edition?: RustPlaygroundEdition;
  maxUrlLength?: number;
}

export function buildRustPlaygroundUrl(
  code: string,
  {
    version = "stable",
    mode = "debug",
    edition = "2021",
    maxUrlLength = DEFAULT_MAX_URL_LENGTH,
  }: RustPlaygroundUrlOptions = {}
): string | null {
  if (!code.trim()) return null;

  const url = new URL("https://play.rust-lang.org/");
  url.searchParams.set("version", version);
  url.searchParams.set("mode", mode);
  url.searchParams.set("edition", edition);
  url.searchParams.set("code", code);

  const str = url.toString();
  if (str.length > maxUrlLength) return null;
  return str;
}

