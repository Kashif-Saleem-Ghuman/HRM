export { default as AppMenu } from '../..\\components\\AppMenu.vue'
export { default as AvatarSubMenu } from '../..\\components\\AvatarSubMenu.vue'
export { default as BibNotification } from '../..\\components\\BibNotification.vue'
export { default as ModalWrapper } from '../..\\components\\ModalWrapper.vue'
export { default as BibAvatar } from '../..\\..\\bib-shared\\components\\Atoms\\BibAvatar.vue'
export { default as BibButton } from '../..\\..\\bib-shared\\components\\Atoms\\BibButton.vue'
export { default as BibCheckbox } from '../..\\..\\bib-shared\\components\\Atoms\\BibCheckbox.vue'
export { default as BibFolder } from '../..\\..\\bib-shared\\components\\Atoms\\BibFolder.vue'
export { default as BibIcon } from '../..\\..\\bib-shared\\components\\Atoms\\BibIcon.vue'
export { default as BibInput } from '../..\\..\\bib-shared\\components\\Atoms\\BibInput.vue'
export { default as BibLink } from '../..\\..\\bib-shared\\components\\Atoms\\BibLink.vue'
export { default as BibLogo } from '../..\\..\\bib-shared\\components\\Atoms\\BibLogo.vue'
export { default as BibPopup } from '../..\\..\\bib-shared\\components\\Atoms\\BibPopup.vue'
export { default as BibProgress } from '../..\\..\\bib-shared\\components\\Atoms\\BibProgress.vue'
export { default as BibRadio } from '../..\\..\\bib-shared\\components\\Atoms\\BibRadio.vue'
export { default as BibSpinner } from '../..\\..\\bib-shared\\components\\Atoms\\BibSpinner.vue'
export { default as BibSwitch } from '../..\\..\\bib-shared\\components\\Atoms\\BibSwitch.vue'
export { default as BibAppSwitcher } from '../..\\..\\bib-shared\\components\\Molecules\\BibAppSwitcher.vue'
export { default as BibBreadcrumb } from '../..\\..\\bib-shared\\components\\Molecules\\BibBreadcrumb.vue'
export { default as BibCard } from '../..\\..\\bib-shared\\components\\Molecules\\BibCard.vue'
export { default as BibChat } from '../..\\..\\bib-shared\\components\\Molecules\\BibChat.vue'
export { default as BibCheckboxGroup } from '../..\\..\\bib-shared\\components\\Molecules\\BibCheckboxGroup.vue'
export { default as BibDatepicker } from '../..\\..\\bib-shared\\components\\Molecules\\BibDatepicker.vue'
export { default as BibDetailCollapse } from '../..\\..\\bib-shared\\components\\Molecules\\BibDetailCollapse.vue'
export { default as BibDropdown } from '../..\\..\\bib-shared\\components\\Molecules\\BibDropdown.vue'
export { default as BibFile } from '../..\\..\\bib-shared\\components\\Molecules\\BibFile.vue'
export { default as BibFolderNode } from '../..\\..\\bib-shared\\components\\Molecules\\BibFolderNode.vue'
export { default as BibFormGroup } from '../..\\..\\bib-shared\\components\\Molecules\\BibFormGroup.vue'
export { default as BibModalWrapper } from '../..\\..\\bib-shared\\components\\Molecules\\BibModalWrapper.vue'
export { default as BibNotificationPersistent } from '../..\\..\\bib-shared\\components\\Molecules\\BibNotificationPersistent.vue'
export { default as BibPanelWrapper } from '../..\\..\\bib-shared\\components\\Molecules\\BibPanelWrapper.vue'
export { default as BibPopupMsg } from '../..\\..\\bib-shared\\components\\Molecules\\BibPopupMsg.vue'
export { default as BibPopupNotification } from '../..\\..\\bib-shared\\components\\Molecules\\BibPopupNotification.vue'
export { default as BibPopupNotificationWrapper } from '../..\\..\\bib-shared\\components\\Molecules\\BibPopupNotificationWrapper.vue'
export { default as BibRadioGroup } from '../..\\..\\bib-shared\\components\\Molecules\\BibRadioGroup.vue'
export { default as BibSearchInput } from '../..\\..\\bib-shared\\components\\Molecules\\BibSearchInput.vue'
export { default as BibSelect } from '../..\\..\\bib-shared\\components\\Molecules\\BibSelect.vue'
export { default as BibSelectOrg } from '../..\\..\\bib-shared\\components\\Molecules\\BibSelectOrg.vue'
export { default as BibSideMenu } from '../..\\..\\bib-shared\\components\\Molecules\\BibSideMenu.vue'
export { default as BibTabs } from '../..\\..\\bib-shared\\components\\Molecules\\BibTabs.vue'
export { default as BibToolbar } from '../..\\..\\bib-shared\\components\\Molecules\\BibToolbar.vue'
export { default as BibUploader } from '../..\\..\\bib-shared\\components\\Molecules\\BibUploader.vue'
export { default as BibUserCard } from '../..\\..\\bib-shared\\components\\Molecules\\BibUserCard.vue'
export { default as BibViewSwitch } from '../..\\..\\bib-shared\\components\\Molecules\\BibViewSwitch.vue'
export { default as BibAppNavigation } from '../..\\..\\bib-shared\\components\\Organisms\\BibAppNavigation.vue'
export { default as BibAppWrapper } from '../..\\..\\bib-shared\\components\\Organisms\\BibAppWrapper.vue'
export { default as BibAppWrapperMobile } from '../..\\..\\bib-shared\\components\\Organisms\\BibAppWrapperMobile.vue'
export { default as BibDragMaster } from '../..\\..\\bib-shared\\components\\Organisms\\BibDragMaster.vue'
export { default as BibDriveMover } from '../..\\..\\bib-shared\\components\\Organisms\\BibDriveMover.vue'
export { default as BibHeader } from '../..\\..\\bib-shared\\components\\Organisms\\BibHeader.vue'
export { default as BibPageTitle } from '../..\\..\\bib-shared\\components\\Organisms\\BibPageTitle.vue'
export { default as BibSidePanel } from '../..\\..\\bib-shared\\components\\Organisms\\BibSidePanel.vue'
export { default as BibTable } from '../..\\..\\bib-shared\\components\\Organisms\\BibTable.vue'
export { default as DragList } from '../..\\..\\bib-shared\\components\\Organisms\\DragList.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
