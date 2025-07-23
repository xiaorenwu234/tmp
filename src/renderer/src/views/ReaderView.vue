<template>
  <div id="reader" tabindex="1">
    <div id="outerContainer">
      <div id="sidebarContainer">
        <div id="toolbarSidebar">
          <div id="toolbarSidebarLeft">
            <div id="sidebarViewButtons" class="splitToolbarButton toggled" role="radiogroup">
              <button
                id="viewThumbnail"
                class="toolbarButton toggled"
                title="Show Thumbnails"
                tabindex="2"
                data-l10n-id="pdfjs-thumbs-button"
                role="radio"
                aria-checked="true"
                aria-controls="thumbnailView"
              >
                <span data-l10n-id="pdfjs-thumbs-button-label">Thumbnails</span>
              </button>
              <button
                id="viewOutline"
                class="toolbarButton"
                title="Show Document Outline (double-click to expand/collapse all items)"
                tabindex="3"
                data-l10n-id="pdfjs-document-outline-button"
                role="radio"
                aria-checked="false"
                aria-controls="outlineView"
              >
                <span data-l10n-id="pdfjs-document-outline-button-label">Document Outline</span>
              </button>
              <button
                id="viewAttachments"
                class="toolbarButton"
                title="Show Attachments"
                tabindex="4"
                data-l10n-id="pdfjs-attachments-button"
                role="radio"
                aria-checked="false"
                aria-controls="attachmentsView"
              >
                <span data-l10n-id="pdfjs-attachments-button-label">Attachments</span>
              </button>
              <button
                id="viewLayers"
                class="toolbarButton"
                title="Show Layers (double-click to reset all layers to the default state)"
                tabindex="5"
                data-l10n-id="pdfjs-layers-button"
                role="radio"
                aria-checked="false"
                aria-controls="layersView"
              >
                <span data-l10n-id="pdfjs-layers-button-label">Layers</span>
              </button>
            </div>
          </div>

          <div id="toolbarSidebarRight">
            <div id="outlineOptionsContainer">
              <div class="verticalToolbarSeparator"></div>

              <button
                id="currentOutlineItem"
                class="toolbarButton"
                disabled="disabled"
                title="Find Current Outline Item"
                tabindex="6"
                data-l10n-id="pdfjs-current-outline-item-button"
              >
                <span data-l10n-id="pdfjs-current-outline-item-button-label"
                  >Current Outline Item</span
                >
              </button>
            </div>
          </div>
        </div>
        <div id="sidebarContent">
          <div id="thumbnailView"></div>
          <div id="outlineView" class="hidden"></div>
          <div id="attachmentsView" class="hidden"></div>
          <div id="layersView" class="hidden"></div>
        </div>
        <div id="sidebarResizer"></div>
      </div>
      <!-- sidebarContainer -->

      <div id="mainContainer">
        <div class="findbar hidden doorHanger" id="findbar">
          <div id="findbarInputContainer">
            <span class="loadingInput end">
              <input
                id="findInput"
                class="toolbarField"
                title="Find"
                placeholder="Find in document…"
                tabindex="91"
                data-l10n-id="pdfjs-find-input"
                aria-invalid="false"
              />
            </span>
            <div class="splitToolbarButton">
              <button
                id="findPrevious"
                class="toolbarButton"
                title="Find the previous occurrence of the phrase"
                tabindex="92"
                data-l10n-id="pdfjs-find-previous-button"
              >
                <span data-l10n-id="pdfjs-find-previous-button-label">Previous</span>
              </button>
              <div class="splitToolbarButtonSeparator"></div>
              <button
                id="findNext"
                class="toolbarButton"
                title="Find the next occurrence of the phrase"
                tabindex="93"
                data-l10n-id="pdfjs-find-next-button"
              >
                <span data-l10n-id="pdfjs-find-next-button-label">Next</span>
              </button>
            </div>
          </div>

          <div id="findbarOptionsOneContainer">
            <input type="checkbox" id="findHighlightAll" class="toolbarField" tabindex="94" />
            <label
              for="findHighlightAll"
              class="toolbarLabel"
              data-l10n-id="pdfjs-find-highlight-checkbox"
              >Highlight All</label
            >
            <input type="checkbox" id="findMatchCase" class="toolbarField" tabindex="95" />
            <label
              for="findMatchCase"
              class="toolbarLabel"
              data-l10n-id="pdfjs-find-match-case-checkbox-label"
              >Match Case</label
            >
          </div>
          <div id="findbarOptionsTwoContainer">
            <input type="checkbox" id="findMatchDiacritics" class="toolbarField" tabindex="96" />
            <label
              for="findMatchDiacritics"
              class="toolbarLabel"
              data-l10n-id="pdfjs-find-match-diacritics-checkbox-label"
              >Match Diacritics</label
            >
            <input type="checkbox" id="findEntireWord" class="toolbarField" tabindex="97" />
            <label
              for="findEntireWord"
              class="toolbarLabel"
              data-l10n-id="pdfjs-find-entire-word-checkbox-label"
              >Whole Words</label
            >
          </div>

          <div id="findbarMessageContainer" aria-live="polite">
            <span id="findResultsCount" class="toolbarLabel"></span>
            <span id="findMsg" class="toolbarLabel"></span>
          </div>
        </div>
        <!-- findbar -->

        <div class="editorParamsToolbar hidden doorHangerRight" id="editorHighlightParamsToolbar">
          <div id="highlightParamsToolbarContainer" class="editorParamsToolbarContainer">
            <div id="editorHighlightColorPicker" class="colorPicker">
              <span
                id="highlightColorPickerLabel"
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-highlight-colorpicker-label"
                >Highlight color</span
              >
            </div>
            <div id="editorHighlightThickness">
              <label
                for="editorFreeHighlightThickness"
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-free-highlight-thickness-input"
                >Thickness</label
              >
              <div class="thicknessPicker">
                <input
                  type="range"
                  id="editorFreeHighlightThickness"
                  class="editorParamsSlider"
                  data-l10n-id="pdfjs-editor-free-highlight-thickness-title"
                  value="12"
                  min="8"
                  max="24"
                  step="1"
                  tabindex="101"
                />
              </div>
            </div>
            <div id="editorHighlightVisibility">
              <div class="divider"></div>
              <div class="toggler">
                <label
                  for="editorHighlightShowAll"
                  class="editorParamsLabel"
                  data-l10n-id="pdfjs-editor-highlight-show-all-button-label"
                  >Show all</label
                >
                <button
                  id="editorHighlightShowAll"
                  class="toggle-button"
                  data-l10n-id="pdfjs-editor-highlight-show-all-button"
                  aria-pressed="true"
                  tabindex="102"
                ></button>
              </div>
            </div>
          </div>
        </div>

        <div class="editorParamsToolbar hidden doorHangerRight" id="editorFreeTextParamsToolbar">
          <div class="editorParamsToolbarContainer">
            <div class="editorParamsSetter">
              <label
                for="editorFreeTextColor"
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-free-text-color-input"
                >Color</label
              >
              <input
                type="color"
                id="editorFreeTextColor"
                class="editorParamsColor"
                tabindex="103"
              />
            </div>
            <div class="editorParamsSetter">
              <label
                for="editorFreeTextFontSize"
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-free-text-size-input"
                >Size</label
              >
              <input
                type="range"
                id="editorFreeTextFontSize"
                class="editorParamsSlider"
                value="10"
                min="5"
                max="100"
                step="1"
                tabindex="104"
              />
            </div>
          </div>
        </div>

        <div class="editorParamsToolbar hidden doorHangerRight" id="editorInkParamsToolbar">
          <div class="editorParamsToolbarContainer">
            <div class="editorParamsSetter">
              <label
                for="editorInkColor"
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-ink-color-input"
                >Color</label
              >
              <input type="color" id="editorInkColor" class="editorParamsColor" tabindex="105" />
            </div>
            <div class="editorParamsSetter">
              <label
                for="editorInkThickness"
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-ink-thickness-input"
                >Thickness</label
              >
              <input
                type="range"
                id="editorInkThickness"
                class="editorParamsSlider"
                value="1"
                min="1"
                max="20"
                step="1"
                tabindex="106"
              />
            </div>
            <div class="editorParamsSetter">
              <label
                for="editorInkOpacity"
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-ink-opacity-input"
                >Opacity</label
              >
              <input
                type="range"
                id="editorInkOpacity"
                class="editorParamsSlider"
                value="100"
                min="1"
                max="100"
                step="1"
                tabindex="107"
              />
            </div>
          </div>
        </div>

        <div class="editorParamsToolbar hidden doorHangerRight" id="editorStampParamsToolbar">
          <div class="editorParamsToolbarContainer">
            <button
              id="editorStampAddImage"
              class="secondaryToolbarButton"
              title="Add image"
              tabindex="108"
              data-l10n-id="pdfjs-editor-stamp-add-image-button"
            >
              <span
                class="editorParamsLabel"
                data-l10n-id="pdfjs-editor-stamp-add-image-button-label"
                >Add image</span
              >
            </button>
          </div>
        </div>

        <div id="secondaryToolbar" class="secondaryToolbar hidden doorHangerRight">
          <div id="secondaryToolbarButtonContainer">
            <button
              id="secondaryPrint"
              class="secondaryToolbarButton visibleMediumView"
              title="Print"
              tabindex="52"
              data-l10n-id="pdfjs-print-button"
            >
              <span data-l10n-id="pdfjs-print-button-label">Print</span>
            </button>

            <button
              id="presentationMode"
              class="secondaryToolbarButton"
              title="Switch to Presentation Mode"
              tabindex="54"
              data-l10n-id="pdfjs-presentation-mode-button"
            >
              <span data-l10n-id="pdfjs-presentation-mode-button-label">Presentation Mode</span>
            </button>

            <a
              href="#"
              id="viewBookmark"
              class="secondaryToolbarButton"
              title="Current Page (View URL from Current Page)"
              tabindex="55"
              data-l10n-id="pdfjs-bookmark-button"
              style="display: none;"
            >
              <span data-l10n-id="pdfjs-bookmark-button-label">Current Page</span>
            </a>

            <button
              id="secondaryFirstPage"
              class="secondaryToolbarButton visibleMediumView"
              title="Go to First Page"
              tabindex="56"
              data-l10n-id="pdfjs-first-page-button"
            >
              <span data-l10n-id="pdfjs-first-page-button-label">Go to First Page</span>
            </button>
            <button
              id="secondaryLastPage"
              class="secondaryToolbarButton visibleMediumView"
              title="Go to Last Page"
              tabindex="57"
              data-l10n-id="pdfjs-last-page-button"
            >
              <span data-l10n-id="pdfjs-last-page-button-label">Go to Last Page</span>
            </button>

            <div class="horizontalToolbarSeparator"></div>

            <button
              id="pageRotateCw"
              class="secondaryToolbarButton"
              title="Rotate Clockwise"
              tabindex="58"
              data-l10n-id="pdfjs-page-rotate-cw-button"
            >
              <span data-l10n-id="pdfjs-page-rotate-cw-button-label">Rotate Clockwise</span>
            </button>
            <button
              id="pageRotateCcw"
              class="secondaryToolbarButton"
              title="Rotate Counterclockwise"
              tabindex="59"
              data-l10n-id="pdfjs-page-rotate-ccw-button"
            >
              <span data-l10n-id="pdfjs-page-rotate-ccw-button-label">Rotate Counterclockwise</span>
            </button>

            <div class="horizontalToolbarSeparator"></div>

            <div id="cursorToolButtons" role="radiogroup">
              <button
                id="cursorSelectTool"
                class="secondaryToolbarButton toggled"
                title="Enable Text Selection Tool"
                tabindex="60"
                data-l10n-id="pdfjs-cursor-text-select-tool-button"
                role="radio"
                aria-checked="true"
              >
                <span data-l10n-id="pdfjs-cursor-text-select-tool-button-label"
                  >Text Selection Tool</span
                >
              </button>
              <button
                id="cursorHandTool"
                class="secondaryToolbarButton"
                title="Enable Hand Tool"
                tabindex="61"
                data-l10n-id="pdfjs-cursor-hand-tool-button"
                role="radio"
                aria-checked="false"
              >
                <span data-l10n-id="pdfjs-cursor-hand-tool-button-label">Hand Tool</span>
              </button>
            </div>

            <div class="horizontalToolbarSeparator"></div>

            <div id="scrollModeButtons" role="radiogroup">
              <button
                id="scrollPage"
                class="secondaryToolbarButton"
                title="Use Page Scrolling"
                tabindex="62"
                data-l10n-id="pdfjs-scroll-page-button"
                role="radio"
                aria-checked="false"
              >
                <span data-l10n-id="pdfjs-scroll-page-button-label">Page Scrolling</span>
              </button>
              <button
                id="scrollVertical"
                class="secondaryToolbarButton toggled"
                title="Use Vertical Scrolling"
                tabindex="63"
                data-l10n-id="pdfjs-scroll-vertical-button"
                role="radio"
                aria-checked="true"
              >
                <span data-l10n-id="pdfjs-scroll-vertical-button-label">Vertical Scrolling</span>
              </button>
              <button
                id="scrollHorizontal"
                class="secondaryToolbarButton"
                title="Use Horizontal Scrolling"
                tabindex="64"
                data-l10n-id="pdfjs-scroll-horizontal-button"
                role="radio"
                aria-checked="false"
              >
                <span data-l10n-id="pdfjs-scroll-horizontal-button-label"
                  >Horizontal Scrolling</span
                >
              </button>
              <button
                id="scrollWrapped"
                class="secondaryToolbarButton"
                title="Use Wrapped Scrolling"
                tabindex="65"
                data-l10n-id="pdfjs-scroll-wrapped-button"
                role="radio"
                aria-checked="false"
              >
                <span data-l10n-id="pdfjs-scroll-wrapped-button-label">Wrapped Scrolling</span>
              </button>
            </div>

            <div class="horizontalToolbarSeparator"></div>

            <div id="spreadModeButtons" role="radiogroup">
              <button
                id="spreadNone"
                class="secondaryToolbarButton toggled"
                title="Do not join page spreads"
                tabindex="66"
                data-l10n-id="pdfjs-spread-none-button"
                role="radio"
                aria-checked="true"
              >
                <span data-l10n-id="pdfjs-spread-none-button-label">No Spreads</span>
              </button>
              <button
                id="spreadOdd"
                class="secondaryToolbarButton"
                title="Join page spreads starting with odd-numbered pages"
                tabindex="67"
                data-l10n-id="pdfjs-spread-odd-button"
                role="radio"
                aria-checked="false"
              >
                <span data-l10n-id="pdfjs-spread-odd-button-label">Odd Spreads</span>
              </button>
              <button
                id="spreadEven"
                class="secondaryToolbarButton"
                title="Join page spreads starting with even-numbered pages"
                tabindex="68"
                data-l10n-id="pdfjs-spread-even-button"
                role="radio"
                aria-checked="false"
              >
                <span data-l10n-id="pdfjs-spread-even-button-label">Even Spreads</span>
              </button>
            </div>
          </div>
        </div>
        <!-- secondaryToolbar -->

        <div class="toolbar">
          <div id="toolbarContainer">
            <div id="toolbarViewer">
              <div id="toolbarViewerLeft">
                <button
                  id="sidebarToggle"
                  class="toolbarButton"
                  title="Toggle Sidebar"
                  tabindex="11"
                  data-l10n-id="pdfjs-toggle-sidebar-button"
                  aria-expanded="false"
                  aria-controls="sidebarContainer"
                >
                  <span data-l10n-id="pdfjs-toggle-sidebar-button-label">Toggle Sidebar</span>
                </button>
                <div class="toolbarButtonSpacer"></div>
                <button
                  id="viewFind"
                  class="toolbarButton"
                  title="Find in Document"
                  tabindex="12"
                  data-l10n-id="pdfjs-findbar-button"
                  aria-expanded="false"
                  aria-controls="findbar"
                >
                  <span data-l10n-id="pdfjs-findbar-button-label">Find</span>
                </button>
                <div class="splitToolbarButton hiddenSmallView">
                  <button
                    id="firstPage"
                    class="toolbarButton"
                    title="Go to First Page"
                    tabindex="13"
                    data-l10n-id="pdfjs-first-page-button"
                  >
                    <span data-l10n-id="pdfjs-first-page-button-label">Go to First Page</span>
                  </button>
                  <button
                    class="toolbarButton"
                    title="Previous Page"
                    id="previous"
                    tabindex="14"
                    data-l10n-id="pdfjs-previous-button"
                  >
                    <span data-l10n-id="pdfjs-previous-button-label">Previous</span>
                  </button>
                </div>
                <span class="loadingInput start">
                  <input
                    type="number"
                    id="pageNumber"
                    class="toolbarField"
                    title="Page"
                    value="1"
                    min="1"
                    tabindex="15"
                    data-l10n-id="pdfjs-page-input"
                    autocomplete="off"
                  />
                </span>
                <span id="numPages" class="toolbarLabel"></span>
                <div class="splitToolbarButton hiddenSmallView">
                  <button
                    class="toolbarButton"
                    title="Next Page"
                    id="next"
                    tabindex="16"
                    data-l10n-id="pdfjs-next-button"
                  >
                    <span data-l10n-id="pdfjs-next-button-label">Next</span>
                  </button>
                  <button
                    id="lastPage"
                    class="toolbarButton"
                    title="Go to Last Page"
                    tabindex="17"
                    data-l10n-id="pdfjs-last-page-button"
                  >
                    <span data-l10n-id="pdfjs-last-page-button-label">Go to Last Page</span>
                  </button>
                </div>
              </div>
              <div id="toolbarViewerRight">
                <div id="editorModeButtons" class="splitToolbarButton toggled" role="radiogroup">
                  <button
                    id="editorHighlight"
                    class="toolbarButton"
                    hidden="true"
                    disabled="disabled"
                    title="Highlight"
                    role="radio"
                    aria-checked="false"
                    aria-controls="editorHighlightParamsToolbar"
                    tabindex="31"
                    data-l10n-id="pdfjs-editor-highlight-button"
                  >
                    <span data-l10n-id="pdfjs-editor-highlight-button-label">Highlight</span>
                  </button>
                  <button
                    id="editorFreeText"
                    class="toolbarButton"
                    disabled="disabled"
                    title="Text"
                    role="radio"
                    aria-checked="false"
                    aria-controls="editorFreeTextParamsToolbar"
                    tabindex="32"
                    data-l10n-id="pdfjs-editor-free-text-button"
                  >
                    <span data-l10n-id="pdfjs-editor-free-text-button-label">Text</span>
                  </button>
                  <button
                    id="editorInk"
                    class="toolbarButton"
                    disabled="disabled"
                    title="Draw"
                    role="radio"
                    aria-checked="false"
                    aria-controls="editorInkParamsToolbar"
                    tabindex="33"
                    data-l10n-id="pdfjs-editor-ink-button"
                  >
                    <span data-l10n-id="pdfjs-editor-ink-button-label">Draw</span>
                  </button>
                  <button
                    id="editorStamp"
                    class="toolbarButton hidden"
                    disabled="disabled"
                    title="Add or edit images"
                    role="radio"
                    aria-checked="false"
                    aria-controls="editorStampParamsToolbar"
                    tabindex="34"
                    data-l10n-id="pdfjs-editor-stamp-button"
                    style="display: none;"
                  >
                    <span data-l10n-id="pdfjs-editor-stamp-button-label">Add or edit images</span>
                  </button>
                  <button
                    id="editorScreenshot"
                    class="toolbarButton"
                    title="截图"
                    role="radio"
                    aria-checked="false"
                    aria-controls="editorScreenshotParamsToolbar"
                    tabindex="35"
                    data-l10n-id="pdfjs-editor-screenshot-button"
                    @click="screenshot"
                  >
                    <span data-l10n-id="pdfjs-editor-screenshot-label">截图</span>
                  </button>
                </div>

                <div id="editorModeSeparator" class="verticalToolbarSeparator"></div>

                <button
                  id="print"
                  class="toolbarButton hiddenMediumView"
                  title="Print"
                  tabindex="41"
                  data-l10n-id="pdfjs-print-button"
                >
                  <span data-l10n-id="pdfjs-print-button-label">Print</span>
                </button>

                <div class="verticalToolbarSeparator hiddenMediumView"></div>

                <button
                  id="secondaryToolbarToggle"
                  class="toolbarButton"
                  title="Tools"
                  tabindex="43"
                  data-l10n-id="pdfjs-tools-button"
                  aria-expanded="false"
                  aria-controls="secondaryToolbar"
                >
                  <span data-l10n-id="pdfjs-tools-button-label">Tools</span>
                </button>
              </div>
              <div id="toolbarViewerMiddle">
                <div class="splitToolbarButton">
                  <button
                    id="zoomOut"
                    class="toolbarButton"
                    title="Zoom Out"
                    tabindex="21"
                    data-l10n-id="pdfjs-zoom-out-button"
                  >
                    <span data-l10n-id="pdfjs-zoom-out-button-label">Zoom Out</span>
                  </button>
                  <div class="splitToolbarButtonSeparator"></div>
                  <button
                    id="zoomIn"
                    class="toolbarButton"
                    title="Zoom In"
                    tabindex="22"
                    data-l10n-id="pdfjs-zoom-in-button"
                  >
                    <span data-l10n-id="pdfjs-zoom-in-button-label">Zoom In</span>
                  </button>
                </div>
                <span id="scaleSelectContainer" class="dropdownToolbarButton">
                  <select
                    id="scaleSelect"
                    title="Zoom"
                    tabindex="23"
                    data-l10n-id="pdfjs-zoom-select"
                  >
                    <option
                      id="pageAutoOption"
                      title=""
                      value="auto"
                      selected="selected"
                      data-l10n-id="pdfjs-page-scale-auto"
                    >
                      Automatic Zoom
                    </option>
                    <option
                      id="pageActualOption"
                      title=""
                      value="page-actual"
                      data-l10n-id="pdfjs-page-scale-actual"
                    >
                      Actual Size
                    </option>
                    <option
                      id="pageFitOption"
                      title=""
                      value="page-fit"
                      data-l10n-id="pdfjs-page-scale-fit"
                    >
                      Page Fit
                    </option>
                    <option
                      id="pageWidthOption"
                      title=""
                      value="page-width"
                      data-l10n-id="pdfjs-page-scale-width"
                    >
                      Page Width
                    </option>
                    <option
                      id="customScaleOption"
                      title=""
                      value="custom"
                      disabled="disabled"
                      hidden="true"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 0 }'
                    >
                      0%
                    </option>
                    <option
                      title=""
                      value="0.5"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 50 }'
                    >
                      50%
                    </option>
                    <option
                      title=""
                      value="0.75"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 75 }'
                    >
                      75%
                    </option>
                    <option
                      title=""
                      value="1"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 100 }'
                    >
                      100%
                    </option>
                    <option
                      title=""
                      value="1.25"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 125 }'
                    >
                      125%
                    </option>
                    <option
                      title=""
                      value="1.5"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 150 }'
                    >
                      150%
                    </option>
                    <option
                      title=""
                      value="2"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 200 }'
                    >
                      200%
                    </option>
                    <option
                      title=""
                      value="3"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 300 }'
                    >
                      300%
                    </option>
                    <option
                      title=""
                      value="4"
                      data-l10n-id="pdfjs-page-scale-percent"
                      data-l10n-args='{ "scale": 400 }'
                    >
                      400%
                    </option>
                  </select>
                </span>
              </div>
            </div>
            <div id="loadingBar">
              <div class="progress">
                <div class="glimmer"></div>
              </div>
            </div>
          </div>
        </div>

        <div id="viewerContainer" tabindex="0">
          <div id="viewer" class="pdfViewer"></div>
        </div>
      </div>
      <!-- mainContainer -->

      <div id="dialogContainer">
        <dialog id="passwordDialog">
          <div class="row">
            <label for="password" id="passwordText" data-l10n-id="pdfjs-password-label"
              >Enter the password to open this PDF file:</label
            >
          </div>
          <div class="row">
            <input type="password" id="password" class="toolbarField" />
          </div>
          <div class="buttonRow">
            <button id="passwordCancel" class="dialogButton">
              <span data-l10n-id="pdfjs-password-cancel-button">Cancel</span>
            </button>
            <button id="passwordSubmit" class="dialogButton">
              <span data-l10n-id="pdfjs-password-ok-button">OK</span>
            </button>
          </div>
        </dialog>
        <dialog id="documentPropertiesDialog">
          <div class="row">
            <span id="fileNameLabel" data-l10n-id="pdfjs-document-properties-file-name"
              >File name:</span
            >
            <p id="fileNameField" aria-labelledby="fileNameLabel">-</p>
          </div>
          <div class="row">
            <span id="fileSizeLabel" data-l10n-id="pdfjs-document-properties-file-size"
              >File size:</span
            >
            <p id="fileSizeField" aria-labelledby="fileSizeLabel">-</p>
          </div>
          <div class="separator"></div>
          <div class="row">
            <span id="titleLabel" data-l10n-id="pdfjs-document-properties-title">Title:</span>
            <p id="titleField" aria-labelledby="titleLabel">-</p>
          </div>
          <div class="row">
            <span id="authorLabel" data-l10n-id="pdfjs-document-properties-author">Author:</span>
            <p id="authorField" aria-labelledby="authorLabel">-</p>
          </div>
          <div class="row">
            <span id="subjectLabel" data-l10n-id="pdfjs-document-properties-subject">Subject:</span>
            <p id="subjectField" aria-labelledby="subjectLabel">-</p>
          </div>
          <div class="row">
            <span id="keywordsLabel" data-l10n-id="pdfjs-document-properties-keywords"
              >Keywords:</span
            >
            <p id="keywordsField" aria-labelledby="keywordsLabel">-</p>
          </div>
          <div class="row">
            <span id="creationDateLabel" data-l10n-id="pdfjs-document-properties-creation-date"
              >Creation Date:</span
            >
            <p id="creationDateField" aria-labelledby="creationDateLabel">-</p>
          </div>
          <div class="row">
            <span
              id="modificationDateLabel"
              data-l10n-id="pdfjs-document-properties-modification-date"
              >Modification Date:</span
            >
            <p id="modificationDateField" aria-labelledby="modificationDateLabel">-</p>
          </div>
          <div class="row">
            <span id="creatorLabel" data-l10n-id="pdfjs-document-properties-creator">Creator:</span>
            <p id="creatorField" aria-labelledby="creatorLabel">-</p>
          </div>
          <div class="separator"></div>
          <div class="row">
            <span id="producerLabel" data-l10n-id="pdfjs-document-properties-producer"
              >PDF Producer:</span
            >
            <p id="producerField" aria-labelledby="producerLabel">-</p>
          </div>
          <div class="row">
            <span id="versionLabel" data-l10n-id="pdfjs-document-properties-version"
              >PDF Version:</span
            >
            <p id="versionField" aria-labelledby="versionLabel">-</p>
          </div>
          <div class="row">
            <span id="pageCountLabel" data-l10n-id="pdfjs-document-properties-page-count"
              >Page Count:</span
            >
            <p id="pageCountField" aria-labelledby="pageCountLabel">-</p>
          </div>
          <div class="row">
            <span id="pageSizeLabel" data-l10n-id="pdfjs-document-properties-page-size"
              >Page Size:</span
            >
            <p id="pageSizeField" aria-labelledby="pageSizeLabel">-</p>
          </div>
          <div class="separator"></div>
          <div class="row">
            <span id="linearizedLabel" data-l10n-id="pdfjs-document-properties-linearized"
              >Fast Web View:</span
            >
            <p id="linearizedField" aria-labelledby="linearizedLabel">-</p>
          </div>
          <div class="buttonRow">
            <button id="documentPropertiesClose" class="dialogButton">
              <span data-l10n-id="pdfjs-document-properties-close-button">Close</span>
            </button>
          </div>
        </dialog>
        <dialog
          class="dialog altText"
          id="altTextDialog"
          aria-labelledby="dialogLabel"
          aria-describedby="dialogDescription"
        >
          <div id="altTextContainer" class="mainContainer">
            <div id="overallDescription">
              <span id="dialogLabel" data-l10n-id="pdfjs-editor-alt-text-dialog-label" class="title"
                >Choose an option</span
              >
              <span id="dialogDescription" data-l10n-id="pdfjs-editor-alt-text-dialog-description">
                Alt text (alternative text) helps when people can’t see the image or when it doesn’t
                load.
              </span>
            </div>
            <div id="addDescription">
              <div class="radio">
                <div class="radioButton">
                  <input
                    type="radio"
                    id="descriptionButton"
                    name="altTextOption"
                    tabindex="0"
                    aria-describedby="descriptionAreaLabel"
                    checked
                  />
                  <label
                    for="descriptionButton"
                    data-l10n-id="pdfjs-editor-alt-text-add-description-label"
                    >Add a description</label
                  >
                </div>
                <div class="radioLabel">
                  <span
                    id="descriptionAreaLabel"
                    data-l10n-id="pdfjs-editor-alt-text-add-description-description"
                  >
                    Aim for 1-2 sentences that describe the subject, setting, or actions.
                  </span>
                </div>
              </div>
              <div class="descriptionArea">
                <textarea
                  id="descriptionTextarea"
                  placeholder="For example, “A young man sits down at a table to eat a meal”"
                  aria-labelledby="descriptionAreaLabel"
                  data-l10n-id="pdfjs-editor-alt-text-textarea"
                  tabindex="0"
                ></textarea>
              </div>
            </div>
            <div id="markAsDecorative">
              <div class="radio">
                <div class="radioButton">
                  <input
                    type="radio"
                    id="decorativeButton"
                    name="altTextOption"
                    aria-describedby="decorativeLabel"
                  />
                  <label
                    for="decorativeButton"
                    data-l10n-id="pdfjs-editor-alt-text-mark-decorative-label"
                    >Mark as decorative</label
                  >
                </div>
                <div class="radioLabel">
                  <span
                    id="decorativeLabel"
                    data-l10n-id="pdfjs-editor-alt-text-mark-decorative-description"
                  >
                    This is used for ornamental images, like borders or watermarks.
                  </span>
                </div>
              </div>
            </div>
            <div id="buttons">
              <button id="altTextCancel" class="secondaryButton" tabindex="0">
                <span data-l10n-id="pdfjs-editor-alt-text-cancel-button">Cancel</span>
              </button>
              <button id="altTextSave" class="primaryButton" tabindex="0">
                <span data-l10n-id="pdfjs-editor-alt-text-save-button">Save</span>
              </button>
            </div>
          </div>
        </dialog>
        <dialog id="printServiceDialog" style="min-width: 200px">
          <div class="row">
            <span data-l10n-id="pdfjs-print-progress-message"
              >Preparing document for printing…</span
            >
          </div>
          <div class="row">
            <progress value="0" max="100"></progress>
            <span
              data-l10n-id="pdfjs-print-progress-percent"
              data-l10n-args='{ "progress": 0 }'
              class="relative-progress"
              >0%</span
            >
          </div>
          <div class="buttonRow">
            <button id="printCancel" class="dialogButton">
              <span data-l10n-id="pdfjs-print-progress-close-button">Cancel</span>
            </button>
          </div>
        </dialog>
      </div>
      <!-- dialogContainer -->
    </div>
    <!-- outerContainer -->
    <div id="printContainer"></div>

    <el-dialog v-model="ocrDialogVisible" draggable title="识别结果">
      <div class="whitespace-pre-line" v-text="ocrText"></div>
      <template #footer>
        <div v-loading="ocrText == ''" class="dialog-footer">
          <el-button type="primary" @click="(ocrDialogVisible = false), (ocrText = '')">
            确定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import ScreenShot from 'js-web-screen-shot'
import { ElMessage } from 'element-plus'
import { onMounted, onUnmounted, ref } from 'vue'
import { createWorker, OEM } from 'tesseract.js'

const ocrDialogVisible = ref<boolean>(false)
const ocrText = ref<string>('')

let worker: Tesseract.Worker

onMounted(async () => {
  await import('../../public/pdfjs/build/pdf.worker.mjs')
  await import('../../public/pdfjs/build/pdf.mjs')
  await import('../../public/pdfjs/web/viewer.mjs')
  let prefix = window.location.href.split('index')[0]
  if (prefix.startsWith('http')) {
    prefix = '../../public/'
  }
  worker = await createWorker('chi_sim', OEM.LSTM_ONLY, {
    corePath: prefix + 'tesseract.js-core',
    langPath: prefix + '4.0.0_best_int',
    workerPath: prefix + 'worker.min.js'
  })
})

onUnmounted(async () => {
  await worker?.terminate()
})

const screenshot = () => {
  function triggerCallback(res) {
    const toolPanel = document.getElementById('toolPanel')
    const ocr = document.createElement('div')
    ocr.className = 'item-panel ocr'
    ocr.addEventListener('click', async () => {
      const canvasCtx = screenshot.getCanvasController().getContext('2d')
      const cutBoxSizePanel = document.getElementById('cutBoxSizePanel')
      const dpr = window.devicePixelRatio || 1
      const x = parseInt(cutBoxSizePanel.style.left) * dpr
      const y = (parseInt(cutBoxSizePanel.style.top) + 35) * dpr
      const [w, h] = cutBoxSizePanel.textContent.split(' * ').map((e) => parseInt(e) * dpr)
      const img = canvasCtx.getImageData(x, y, w, h)
      const newCanvas = document.createElement('canvas')
      newCanvas.width = w
      newCanvas.height = h
      newCanvas.getContext('2d').putImageData(img, 0, 0)
      ocrDialogVisible.value = true
      const res = await worker.recognize(newCanvas)
      // 去除汉字间的空格
      ocrText.value = res.data.text.replace(
        /(?<=[\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef])\ +(?=[\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef])/g,
        ''
      )
      if (ocrText.value === '') {
        ocrText.value = '未识别到文字'
      }
    })
    toolPanel.insertBefore(ocr, document.querySelector('.item-panel.save'))
  }

  const screenshot = new ScreenShot({
    enableWebRtc: false,
    level: 99,
    completeCallback: async (imgInfo) => {
      ElMessage.success({ message: '复制成功' })
    },
    triggerCallback
  })
}
</script>

<style lang="scss">
#sidebarContent * {
  // 调整侧边栏滚动条、页面边框显示
  box-sizing: unset;
  // 截图时侧边栏不变暗
  background-color: var(--body-bg-color);
  z-index: 100;
}

// 截图成功信息在顶层
.el-message {
  z-index: 10000 !important;
}

#toolPanel,
#optionPanel {
  border-radius: 6px;
  height: auto !important;
}

#toolPanel .ocr {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTkuOTUyIDYuMjVjLS40MyAwLS44MzIgMC0xLjE2LjA0OWMtLjM3MS4wNTUtLjc1Mi4xODYtMS4wNTcuNTI1Yy0uMjk0LjMyNy0uMzk4LjcxNy0uNDQzIDEuMDg5Yy0uMDQyLjM0OC0uMDQyLjc4LS4wNDIgMS4yNjd2LjU3YS43NS43NSAwIDAgMCAxLjUgMHYtLjUyOGMwLS41NDMuMDAxLS44ODIuMDMxLTEuMTI5YS45NzYuOTc2IDAgMCAxIC4wNDYtLjIyYS4xMzMuMTMzIDAgMCAxIC4wMjMtLjA0NmguMDAxYy4wMDEtLjAwMi4wMDItLjAwMy4wMTEtLjAwOGEuNTkyLjU5MiAwIDAgMSAuMTUyLS4wMzdjLjIwNC0uMDMuNDkxLS4wMzIuOTg2LS4wMzJoMS4yNXY4LjVIOS41YS43NS43NSAwIDAgMCAwIDEuNUgxNWEuNzUuNzUgMCAwIDAgMC0xLjVoLTIuMjV2LTguNUgxNGMuNDk1IDAgLjc4Mi4wMDIuOTg2LjAzMmMuMDkyLjAxNC4xMzUuMDMuMTUyLjAzN2wuMDExLjAwN3YuMDAxYS4xMy4xMyAwIDAgMSAuMDI0LjA0NWMuMDE0LjAzOC4wMzIuMTA1LjA0Ni4yMjFjLjAzLjI0Ny4wMzEuNTg2LjAzMSAxLjEzdi41MjdhLjc1Ljc1IDAgMCAwIDEuNSAwdi0uNTdjMC0uNDg4IDAtLjkxOS0uMDQyLTEuMjY3Yy0uMDQ1LS4zNzItLjE0OS0uNzYyLS40NDMtMS4wOWMtLjMwNS0uMzM4LS42ODYtLjQ2OS0xLjA1Ny0uNTI0Yy0uMzI4LS4wNS0uNzMtLjA1LTEuMTYtLjA0OXoiLz48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjk0MyAxLjI1Yy0yLjMwOSAwLTQuMTE4IDAtNS41My4xOWMtMS40NDQuMTk0LTIuNTg0LjYtMy40NzkgMS40OTRjLS44OTUuODk1LTEuMyAyLjAzNS0xLjQ5NCAzLjQ4Yy0uMTkgMS40MTEtLjE5IDMuMjItLjE5IDUuNTI5di4xMTRjMCAyLjMwOSAwIDQuMTE4LjE5IDUuNTNjLjE5NCAxLjQ0NC42IDIuNTg0IDEuNDk0IDMuNDc5Yy44OTUuODk1IDIuMDM1IDEuMyAzLjQ4IDEuNDk0YzEuNDExLjE5IDMuMjIuMTkgNS41MjkuMTloLjExNGMyLjMwOSAwIDQuMTE4IDAgNS41My0uMTljMS40NDQtLjE5NCAyLjU4NC0uNiAzLjQ3OS0xLjQ5NGMuODk1LS44OTUgMS4zLTIuMDM1IDEuNDk0LTMuNDhjLjE5LTEuNDExLjE5LTMuMjIuMTktNS41Mjl2LS4xMTRjMC0yLjMwOSAwLTQuMTE4LS4xOS01LjUzYy0uMTk0LTEuNDQ0LS42LTIuNTg0LTEuNDk0LTMuNDc5Yy0uODk1LS44OTUtMi4wMzUtMS4zLTMuNDgtMS40OTRjLTEuNDExLS4xOS0zLjIyLS4xOS01LjUyOS0uMTl6TTMuOTk1IDMuOTk1Yy41Ny0uNTcgMS4zNC0uODk3IDIuNjE5LTEuMDY5YzEuMy0uMTc0IDMuMDA4LS4xNzYgNS4zODYtLjE3NnM0LjA4Ni4wMDIgNS4zODYuMTc2YzEuMjc5LjE3MiAyLjA1LjUgMi42MiAxLjA2OWMuNTY5LjU3Ljg5NiAxLjM0IDEuMDY4IDIuNjE5Yy4xNzQgMS4zLjE3NiAzLjAwOC4xNzYgNS4zODZzLS4wMDIgNC4wODYtLjE3NiA1LjM4NmMtLjE3MiAxLjI3OS0uNSAyLjA1LTEuMDY5IDIuNjJjLS41Ny41NjktMS4zNC44OTYtMi42MTkgMS4wNjhjLTEuMy4xNzQtMy4wMDguMTc2LTUuMzg2LjE3NnMtNC4wODYtLjAwMi01LjM4Ni0uMTc2Yy0xLjI3OS0uMTcyLTIuMDUtLjUtMi42Mi0xLjA2OWMtLjU2OS0uNTctLjg5Ni0xLjM0LTEuMDY4LTIuNjE5Yy0uMTc0LTEuMy0uMTc2LTMuMDA4LS4xNzYtNS4zODZzLjAwMi00LjA4Ni4xNzYtNS4zODZjLjE3Mi0xLjI3OS41LTIuMDUgMS4wNjktMi42MiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+);
  background-size: cover;

  &:hover {
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiMxMWI2ZjUiIGQ9Ik05Ljk1MiA2LjI1Yy0uNDMgMC0uODMyIDAtMS4xNi4wNDljLS4zNzEuMDU1LS43NTIuMTg2LTEuMDU3LjUyNWMtLjI5NC4zMjctLjM5OC43MTctLjQ0MyAxLjA4OWMtLjA0Mi4zNDgtLjA0Mi43OC0uMDQyIDEuMjY3di41N2EuNzUuNzUgMCAwIDAgMS41IDB2LS41MjhjMC0uNTQzLjAwMS0uODgyLjAzMS0xLjEyOWEuOTc2Ljk3NiAwIDAgMSAuMDQ2LS4yMmEuMTMzLjEzMyAwIDAgMSAuMDIzLS4wNDZoLjAwMWMuMDAxLS4wMDIuMDAyLS4wMDMuMDExLS4wMDhhLjU5Mi41OTIgMCAwIDEgLjE1Mi0uMDM3Yy4yMDQtLjAzLjQ5MS0uMDMyLjk4Ni0uMDMyaDEuMjV2OC41SDkuNWEuNzUuNzUgMCAwIDAgMCAxLjVIMTVhLjc1Ljc1IDAgMCAwIDAtMS41aC0yLjI1di04LjVIMTRjLjQ5NSAwIC43ODIuMDAyLjk4Ni4wMzJjLjA5Mi4wMTQuMTM1LjAzLjE1Mi4wMzdsLjAxMS4wMDd2LjAwMWEuMTMuMTMgMCAwIDEgLjAyNC4wNDVjLjAxNC4wMzguMDMyLjEwNS4wNDYuMjIxYy4wMy4yNDcuMDMxLjU4Ni4wMzEgMS4xM3YuNTI3YS43NS43NSAwIDAgMCAxLjUgMHYtLjU3YzAtLjQ4OCAwLS45MTktLjA0Mi0xLjI2N2MtLjA0NS0uMzcyLS4xNDktLjc2Mi0uNDQzLTEuMDljLS4zMDUtLjMzOC0uNjg2LS40NjktMS4wNTctLjUyNGMtLjMyOC0uMDUtLjczLS4wNS0xLjE2LS4wNDl6Ii8+PHBhdGggZmlsbD0iIzExYjZmNSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEuOTQzIDEuMjVjLTIuMzA5IDAtNC4xMTggMC01LjUzLjE5Yy0xLjQ0NC4xOTQtMi41ODQuNi0zLjQ3OSAxLjQ5NGMtLjg5NS44OTUtMS4zIDIuMDM1LTEuNDk0IDMuNDhjLS4xOSAxLjQxMS0uMTkgMy4yMi0uMTkgNS41Mjl2LjExNGMwIDIuMzA5IDAgNC4xMTguMTkgNS41M2MuMTk0IDEuNDQ0LjYgMi41ODQgMS40OTQgMy40NzljLjg5NS44OTUgMi4wMzUgMS4zIDMuNDggMS40OTRjMS40MTEuMTkgMy4yMi4xOSA1LjUyOS4xOWguMTE0YzIuMzA5IDAgNC4xMTggMCA1LjUzLS4xOWMxLjQ0NC0uMTk0IDIuNTg0LS42IDMuNDc5LTEuNDk0Yy44OTUtLjg5NSAxLjMtMi4wMzUgMS40OTQtMy40OGMuMTktMS40MTEuMTktMy4yMi4xOS01LjUyOXYtLjExNGMwLTIuMzA5IDAtNC4xMTgtLjE5LTUuNTNjLS4xOTQtMS40NDQtLjYtMi41ODQtMS40OTQtMy40NzljLS44OTUtLjg5NS0yLjAzNS0xLjMtMy40OC0xLjQ5NGMtMS40MTEtLjE5LTMuMjItLjE5LTUuNTI5LS4xOXpNMy45OTUgMy45OTVjLjU3LS41NyAxLjM0LS44OTcgMi42MTktMS4wNjljMS4zLS4xNzQgMy4wMDgtLjE3NiA1LjM4Ni0uMTc2czQuMDg2LjAwMiA1LjM4Ni4xNzZjMS4yNzkuMTcyIDIuMDUuNSAyLjYyIDEuMDY5Yy41NjkuNTcuODk2IDEuMzQgMS4wNjggMi42MTljLjE3NCAxLjMuMTc2IDMuMDA4LjE3NiA1LjM4NnMtLjAwMiA0LjA4Ni0uMTc2IDUuMzg2Yy0uMTcyIDEuMjc5LS41IDIuMDUtMS4wNjkgMi42MmMtLjU3LjU2OS0xLjM0Ljg5Ni0yLjYxOSAxLjA2OGMtMS4zLjE3NC0zLjAwOC4xNzYtNS4zODYuMTc2cy00LjA4Ni0uMDAyLTUuMzg2LS4xNzZjLTEuMjc5LS4xNzItMi4wNS0uNS0yLjYyLTEuMDY5Yy0uNTY5LS41Ny0uODk2LTEuMzQtMS4wNjgtMi42MTljLS4xNzQtMS4zLS4xNzYtMy4wMDgtLjE3Ni01LjM4NnMuMDAyLTQuMDg2LjE3Ni01LjM4NmMuMTcyLTEuMjc5LjUtMi4wNSAxLjA2OS0yLjYyIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=);
  }
}
</style>
