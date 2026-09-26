import React, { useState } from "react";
import { ASSETS } from "../data/storiesData";
import { ScreenType } from "./Header";

interface FooterProps {
  onNavigate: (screen: ScreenType, genreFilter?: string, sectionId?: string) => void;
  onOpenBookmarks: () => void;
  onShowToast: (title: string, subtitle?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBookmarks,
  onShowToast,
}) => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    onShowToast("Weekly Literary Dispatch", `Subscribed ${email} to Sunday editions.`);
    setEmail("");
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface">
      <div className="max-w-7xl mx-auto px-gutter-mobile sm:px-gutter-desktop pt-space-xl pb-space-lg">
        {/* Top Footer Newsletter Banner */}
        <div className="bg-surface-container p-space-lg sm:p-space-xl rounded-xl mb-space-xl flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold block mb-space-xs">
              The Weekly Literary Dispatch
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
              Curated longform delivered quietly to your desk
            </h3>
            <p className="font-body-ui-md text-body-ui-md text-on-surface-variant">
              Essays, serialized fiction, craft notes, and deep inquiries into the modern condition.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-space-xs text-primary font-label-lg text-label-lg font-semibold bg-surface px-space-lg py-space-sm rounded-lg">
              <span className="material-symbols-outlined text-secondary">check_circle</span>
              <span>Subscribed to Sunday Dispatch</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-space-xs"
            >
              <input
                className="w-full sm:w-auto bg-surface px-space-md py-space-sm rounded-lg text-on-surface placeholder:text-outline font-body-ui-sm text-body-ui-sm focus:outline-none focus:ring-2 focus:ring-primary/40 min-w-[260px]"
                placeholder="Your email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="w-full sm:w-auto bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container px-space-lg py-space-sm rounded-lg font-label-lg text-label-lg transition-colors whitespace-nowrap cursor-pointer"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl">
          <div className="lg:col-span-2 pr-space-lg">
            <div className="flex items-center gap-space-sm mb-space-md">
              <img
                alt="StoryVerse Logo"
                className="h-7 w-auto object-contain"
                src={ASSETS.logo}
                referrerPolicy="no-referrer"
              />
              <span className="font-headline-sm text-headline-sm text-primary font-semibold">
                StoryVerse
              </span>
            </div>
            <p className="font-body-editorial-md text-body-editorial-md text-on-surface-variant mb-space-lg">
              An immersive literary sanctuary crafted for discerning readers and dedicated essayists.
              Preserving the intimacy of physical literary periodicals through thoughtful digital craft.
            </p>
            <div className="flex items-center gap-space-sm text-on-surface-variant">
              <button
                type="button"
                aria-label="Archive Feed"
                onClick={() => onNavigate("discover")}
                className="p-space-xs hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">rss_feed</span>
              </button>
              <button
                type="button"
                aria-label="Global Community"
                onClick={() => onNavigate("home", undefined, "living-guild")}
                className="p-space-xs hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </button>
              <button
                type="button"
                aria-label="Correspondence"
                onClick={() =>
                  onShowToast("Editorial Correspondence", "Dispatches open at desk@storyverse.press")
                }
                className="p-space-xs hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">mail</span>
              </button>
              <button
                type="button"
                aria-label="Audio Editions"
                onClick={() => onNavigate("reading")}
                className="p-space-xs hover:text-primary transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">headphones</span>
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider mb-space-md font-semibold">
              Explore
            </h4>
            <ul className="space-y-space-sm font-body-ui-sm text-body-ui-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("discover")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Curated Essays
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("discover", "Mystery")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Serialized Fiction
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("reading")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Literary Archive
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("home", undefined, "editors-picks")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Editorials &amp; Picks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider mb-space-md font-semibold">
              For Writers
            </h4>
            <ul className="space-y-space-sm font-body-ui-sm text-body-ui-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("write-story")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Distraction-Free Editor
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("write-story")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Submission Guidelines
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("write-story")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Author Royalties
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("home", undefined, "meet-storytellers")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Annual Fellowship
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider mb-space-md font-semibold">
              Sanctuary
            </h4>
            <ul className="space-y-space-sm font-body-ui-sm text-body-ui-sm">
              <li>
                <button
                  type="button"
                  onClick={onOpenBookmarks}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Reading Bookmarks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("home", undefined, "living-guild")}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Platform Manifesto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast("Archival Rights", "100% author intellectual property & CC archival options.")
                  }
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Privacy &amp; Archival Rights
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast("Colophon", "Typeset in Playfair Display, Literata & Plus Jakarta Sans.")
                  }
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Colophon
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-label-sm text-label-sm gap-space-sm">
          <p>© 2025 StoryVerse Press Ltd. Typeset in Playfair &amp; Literata. All rights reserved.</p>
          <div className="flex items-center gap-space-md">
            <span>Parchment Edition 4.2</span>
            <span className="w-1 h-1 rounded-full bg-outline"></span>
            <span>Archival Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
