import { LayoutState } from '../layout.store';

export function toggleNavigationSidenavReducer(_event: any, state: LayoutState) {
  return {
    navigationSidenavOpen: !state.navigationSidenavOpen
  };
}

export function openNavigationSidenavReducer() {
  return {
    navigationSidenavOpen: true
  };
}

export function closeNavigationSidenavReducer() {
  return {
    navigationSidenavOpen: false
  };
}

export function toggleNotificationSidenavReducer(_event: any, state: LayoutState) {
  return {
    notificationSidenavOpen: !state.notificationSidenavOpen
  };
}

export function openNotificationSidenavReducer() {
  return {
    notificationSidenavOpen: true
  };
}

export function closeNotificationSidenavReducer() {
  return {
    notificationSidenavOpen: false
  };
}

export function closeAllReducer() {
  return {
    navigationSidenavOpen: false,
    notificationSidenavOpen: false
  };
}
