import { storage } from '#imports';

/** Demo counter shared live across the popup and side panel via extension storage. */
export const counterStorage = storage.defineItem<number>('local:counter', {
  fallback: 0,
});

/** Example synced setting toggled from the options page. */
export const showBadgeStorage = storage.defineItem<boolean>('sync:showBadge', {
  fallback: true,
});
