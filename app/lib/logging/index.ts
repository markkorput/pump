import dbg from "debug";

/**
 * Sets default logging "scopes".
 *
 * See debug package's documentation for scope formats:
 * https://github.com/debug-js/debug#wildcards
 *
 * Note; the default scope is written to localStorage. If a scope is
 * already specified in localStorage, then this method will NOT overwrite
 * it. This way the user can specify a preferred scope by manually altering
 * the scope value in the brower's localStorage.
 *
 * Note also; all application logs are prefixed with `cf:` so make sure to
 * add this prefix to the given scope(s).
 *
 * ### Examples
 *
 * ```ts
 * // show all logs in the "cf:" scope
 * setDefaultLogScope("cf:*");
 *
 * // show all logs in the "cf:" scope, except debug messages
 * setDefaultLogScope("cf:*,-cf:*:debug");
 *
 * // show only cf warnings and errors, but mute warnings from the cms lib
 * setDefaultLogScope("cf:*:warning,cf:*:error,-cf:cms:warning");
 * ```
 */
export function setDefaultLogScope(...scopes: string[]): void {
  try {
    const setting = localStorage.getItem("debug");
    if (!setting) localStorage.setItem("debug", scopes.join(","));
  } catch {
    // ignore
  }
}

export type Logger = {
    error: (...data: unknown[]) => void,
    warning: (...data: unknown[]) => void,
    info: (...data: unknown[]) => void,
    debug: (...data: unknown[]) => void,
    debugger: dbg.Debugger,
    sub: (scope:string) => Logger;
}

function toLogger(dbugger: dbg.Debugger): Logger {
    // create scoped Debugger instances for each level
    const debug = dbugger.extend("debug");
    const info = dbugger.extend("info");
    const warning = dbugger.extend("warning");
    const error = dbugger.extend("error");
  
    // pipe each Debugger to the appropriate native API
    debug.log = console.info.bind(console);
    info.log = console.log.bind(console);
    warning.log = console.warn.bind(console);
    error.log = console.error.bind(console);
  
    return {
      debug, info, warning, error, debugger: dbugger, sub: (scope) => toLogger(dbugger.extend(scope))
    }
}
  

/**
 * @returns a Logger API with the given scope
 *
 * #### Example
 *
 * ```ts
 * const log = createLogger("foo:bar");
 *
 * // logs: "cfoo:bar:debug It Works!"
 * log.debug("It works!");
 *
 * // logs: "foo:bar:error Not good"
 * log.error("Not good");
 * ```
 */
export function createLogger(scope: string): Logger {
  return toLogger(dbg(scope));
}

setDefaultLogScope("*");