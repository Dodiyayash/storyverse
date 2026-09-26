import React, { useState } from "react";
import { ASSETS } from "../data/storiesData";

export type ScreenType = "home" | "discover" | "reading" | "write-story";

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType, genreFilter?: string, sectionId?: string) => void;
  bookmarksCount: number;
  onOpenBookmarks: () => void;
  onOpenSearchModal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  bookmarksCount,
  onOpenBookmarks,
  onOpenSearchModal,
  darkMode,
  onToggleDarkMode,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeNavSub, setActiveNavSub] = useState<string | null>(null);

  const handleNavClick = (path: string) => {
    setActiveNavSub(null);
    if (path === "home") {
      onNavigate("home");
    } else if (path === "discover") {
      onNavigate("discover");
    } else if (path === "genres") {
      setActiveNavSub("genres");
      onNavigate("home", undefined, "explore-genres");
    } else if (path === "writers") {
      setActiveNavSub("writers");
      onNavigate("home", undefined, "meet-storytellers");
    } else if (path === "about") {
      setActiveNavSub("about");
      onNavigate("home", undefined, "living-guild");
    } else if (path === "reading") {
      onNavigate("reading");
    } else if (path === "write-story") {
      onNavigate("write-story");
    }
  };

  const getNavClasses = (tab: string) => {
    const isActive =
      (tab === "home" && currentScreen === "home" && !activeNavSub) ||
      (tab === "discover" && currentScreen === "discover") ||
      (tab === "reading" && currentScreen === "reading") ||
      (activeNavSub === tab && currentScreen === "home");

    if (isActive) {
      return "px-space-md py-space-xs transition-colors bg-surface-container-high text-on-surface font-semibold rounded-lg whitespace-nowrap";
    }
    return "px-space-md py-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg font-label-lg text-label-lg whitespace-nowrap";
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-gutter-mobile sm:px-gutter-desktop flex items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-xl">
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-space-sm text-left cursor-pointer"
          >
            <img
              alt="StoryVerse Logo"
              className="h-8 w-auto object-contain"
              src={ASSETS.logo}
              referrerPolicy="no-referrer"
            />
            <span className="font-headline-md text-headline-md tracking-tight text-primary font-semibold">
              StoryVerse
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-space-xs">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className={getNavClasses("home")}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("discover")}
              className={getNavClasses("discover")}
            >
              Discover
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("reading")}
              className={getNavClasses("reading")}
            >
              Reading Room
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("genres")}
              className={getNavClasses("genres")}
            >
              Genres
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("writers")}
              className={getNavClasses("writers")}
            >
              Writers
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("about")}
              className={getNavClasses("about")}
            >
              About
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-space-md">
          {/* Quick Search Bar */}
          <button
            type="button"
            onClick={onOpenSearchModal}
            className="hidden md:flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-xs rounded-full cursor-pointer hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-outline text-lg">search</span>
            <span className="font-label-md text-label-md text-on-surface-variant">
              Search essays, stories, authors...
            </span>
            <kbd className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-space-xs py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarks Drawer Button */}
          <button
            onClick={onOpenBookmarks}
            className="p-space-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-full transition-colors relative cursor-pointer"
            title="Reading Bookmarks"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">bookmarks</span>
            {bookmarksCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-bold">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-space-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-full transition-colors cursor-pointer"
            title="Toggle Theme"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="p-space-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-full transition-colors relative cursor-pointer"
              title="Notifications"
              type="button"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 p-space-md z-50">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider">
                    Sanctuary Dispatches
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-label-sm text-secondary font-semibold hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="space-y-space-sm">
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate("reading");
                    }}
                    className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <p className="font-body-ui-sm text-body-ui-sm text-on-surface font-medium">
                      Dr. Julian Croft replied to Chapter 2 of <em>The Last Letter</em>
                    </p>
                    <span className="font-label-sm text-label-sm text-outline">2 hours ago</span>
                  </div>
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate("write-story");
                    }}
                    className="p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                  >
                    <p className="font-body-ui-sm text-body-ui-sm text-on-surface font-medium">
                      Draft <em>The House Beyond the Woods</em> synced to archival cloud
                    </p>
                    <span className="font-label-sm text-label-sm text-outline">Just now</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Write a Story CTA */}
          <button
            type="button"
            onClick={() => handleNavClick("write-story")}
            className={`hidden sm:inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-lg font-label-lg text-label-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap ${
              currentScreen === "write-story"
                ? "bg-primary-container text-on-primary-container ring-2 ring-primary/40"
                : "bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container"
            }`}
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
            <span>Write a Story</span>
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-space-xs pl-space-xs py-space-xs cursor-pointer group"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={ASSETS.userProfile}
                referrerPolicy="no-referrer"
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                  Yash
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  Editor
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-base group-hover:text-on-surface transition-colors">
                arrow_drop_down
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/40 p-space-xs z-50">
                <div className="px-space-md py-space-sm border-b border-outline-variant/30 mb-1">
                  <p className="font-label-md text-label-md font-bold text-on-surface">
                    Yash · Senior Editor
                  </p>
                  <p className="font-label-sm text-label-sm text-outline">
                    Fellowship Patron Tier
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate("home");
                  }}
                  className="w-full text-left px-space-md py-space-xs rounded-lg hover:bg-surface-container font-body-ui-sm text-body-ui-sm text-on-surface flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-base text-primary">home</span>
                  Home Sanctuary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate("discover");
                  }}
                  className="w-full text-left px-space-md py-space-xs rounded-lg hover:bg-surface-container font-body-ui-sm text-body-ui-sm text-on-surface flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-base text-primary">explore</span>
                  Discover Folio
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate("reading");
                  }}
                  className="w-full text-left px-space-md py-space-xs rounded-lg hover:bg-surface-container font-body-ui-sm text-body-ui-sm text-on-surface flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-base text-primary">menu_book</span>
                  Continue Reading
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate("write-story");
                  }}
                  className="w-full text-left px-space-md py-space-xs rounded-lg hover:bg-surface-container font-body-ui-sm text-body-ui-sm text-on-surface flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-base text-primary">edit_note</span>
                  Writer Studio
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenBookmarks();
                  }}
                  className="w-full text-left px-space-md py-space-xs rounded-lg hover:bg-surface-container font-body-ui-sm text-body-ui-sm text-on-surface flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-base text-secondary">bookmarks</span>
                  Saved Folio ({bookmarksCount})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
