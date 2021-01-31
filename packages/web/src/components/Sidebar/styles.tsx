import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  .pro-sidebar,
  .pro-sidebar-layout,
  .pro-sidebar-inner {
    height: 100%;
    width: 100%;
    z-index: 0;
  }

  $sidebar-bg-color: #edf2f7 !default;
  $sidebar-color: #adadad !default;
  $sidebar-width: 270px !default;
  $sidebar-collapsed-width: 80px !default;
  $highlight-color: #d8d8d8 !default;
  $submenu-bg-color: #2b2b2b !default;
  $submenu-bg-color-collapsed: #2b2b2b !default;
  $icon-bg-color: #2b2b2b !default;
  $icon-size: 35px !default;
  $breakpoint-xs: 480px !default;
  $breakpoint-sm: 576px !default;
  $breakpoint-md: 768px !default;
  $breakpoint-lg: 992px !default;
  $breakpoint-xl: 1200px !default;
`;
