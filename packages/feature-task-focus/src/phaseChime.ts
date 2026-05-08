import type { PomodoroSegment } from "./types.js";

/**
 * Very short tone(s) when a Pomodoro phase ends. Uses Web Audio API (no asset files).
 * Skipped when `prefers-reduced-motion: reduce` is set (accessibility alignment).
 * Safe no-op if AudioContext is unavailable or autoplay blocks playback.
 */
export function playPhaseTransitionChime(finishedSegment: PomodoroSegment): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      return;
    }
  } catch {
    /* ignore */
  }

  const MaybeCtx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!MaybeCtx) {
    return;
  }

  const ctx = new MaybeCtx();

  const schedule = (now: number): void => {
    const tone = (
      frequency: number,
      startAt: number,
      duration: number,
      peakGain: number,
    ): void => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, startAt);
      const eps = 0.0001;
      gain.gain.setValueAtTime(eps, startAt);
      gain.gain.exponentialRampToValueAtTime(Math.max(eps, peakGain), startAt + 0.02);
      gain.gain.exponentialRampToValueAtTime(eps, startAt + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startAt);
      osc.stop(startAt + duration + 0.06);
    };

    if (finishedSegment === "work") {
      tone(784, now, 0.11, 0.11);
      tone(988, now + 0.13, 0.13, 0.085);
    } else {
      tone(523.25, now, 0.16, 0.07);
    }

    window.setTimeout(() => {
      void ctx.close().catch(() => {
        /* ignore */
      });
    }, 480);
  };

  void ctx
    .resume()
    .then(() => {
      schedule(ctx.currentTime);
    })
    .catch(() => {
      void ctx.close().catch(() => {
        /* ignore */
      });
    });
}
