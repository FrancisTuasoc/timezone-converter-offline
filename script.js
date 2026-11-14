(function () {
  'use strict';

  // Curated Major World Cities / Zones (100% Free Built-in IANA Timezones)
  const CURATED_ZONES = [
    { tz: 'UTC', label: 'UTC — Coordinated Universal Time' },
    { tz: 'America/New_York', label: 'New York, USA (Eastern)' },
    { tz: 'America/Chicago', label: 'Chicago, USA (Central)' },
    { tz: 'America/Denver', label: 'Denver, USA (Mountain)' },
    { tz: 'America/Los_Angeles', label: 'Los Angeles, USA (Pacific)' },
    { tz: 'America/Anchorage', label: 'Anchorage, USA (Alaska)' },
    { tz: 'Pacific/Honolulu', label: 'Honolulu, USA (Hawaii)' },
    { tz: 'America/Toronto', label: 'Toronto, Canada' },
    { tz: 'America/Vancouver', label: 'Vancouver, Canada' },
    { tz: 'America/Mexico_City', label: 'Mexico City, Mexico' },
    { tz: 'America/Sao_Paulo', label: 'São Paulo, Brazil' },
    { tz: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires, Argentina' },
    { tz: 'Europe/London', label: 'London, United Kingdom' },
    { tz: 'Europe/Dublin', label: 'Dublin, Ireland' },
    { tz: 'Europe/Lisbon', label: 'Lisbon, Portugal' },
    { tz: 'Europe/Paris', label: 'Paris, France' },
    { tz: 'Europe/Berlin', label: 'Berlin, Germany' },
    { tz: 'Europe/Madrid', label: 'Madrid, Spain' },
    { tz: 'Europe/Rome', label: 'Rome, Italy' },
    { tz: 'Europe/Amsterdam', label: 'Amsterdam, Netherlands' },
    { tz: 'Europe/Zurich', label: 'Zurich, Switzerland' },
    { tz: 'Europe/Stockholm', label: 'Stockholm, Sweden' },
    { tz: 'Europe/Warsaw', label: 'Warsaw, Poland' },
    { tz: 'Europe/Athens', label: 'Athens, Greece' },
    { tz: 'Europe/Istanbul', label: 'Istanbul, Turkey' },
    { tz: 'Europe/Moscow', label: 'Moscow, Russia' },
    { tz: 'Africa/Cairo', label: 'Cairo, Egypt' },
    { tz: 'Africa/Johannesburg', label: 'Johannesburg, South Africa' },
    { tz: 'Africa/Lagos', label: 'Lagos, Nigeria' },
    { tz: 'Africa/Nairobi', label: 'Nairobi, Kenya' },
    { tz: 'Asia/Jerusalem', label: 'Jerusalem, Israel' },
    { tz: 'Asia/Riyadh', label: 'Riyadh, Saudi Arabia' },
    { tz: 'Asia/Dubai', label: 'Dubai, UAE' },
    { tz: 'Asia/Karachi', label: 'Karachi, Pakistan' },
    { tz: 'Asia/Kolkata', label: 'Mumbai / New Delhi, India' },
    { tz: 'Asia/Kathmandu', label: 'Kathmandu, Nepal' },
    { tz: 'Asia/Dhaka', label: 'Dhaka, Bangladesh' },
    { tz: 'Asia/Bangkok', label: 'Bangkok, Thailand' },
    { tz: 'Asia/Jakarta', label: 'Jakarta, Indonesia' },
    { tz: 'Asia/Singapore', label: 'Singapore' },
    { tz: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur, Malaysia' },
    { tz: 'Asia/Manila', label: 'Manila, Philippines' },
    { tz: 'Asia/Hong_Kong', label: 'Hong Kong' },
    { tz: 'Asia/Taipei', label: 'Taipei, Taiwan' },
    { tz: 'Asia/Shanghai', label: 'Beijing / Shanghai, China' },
    { tz: 'Asia/Seoul', label: 'Seoul, South Korea' },
    { tz: 'Asia/Tokyo', label: 'Tokyo, Japan' },
    { tz: 'Australia/Perth', label: 'Perth, Australia' },
    { tz: 'Australia/Adelaide', label: 'Adelaide, Australia' },
    { tz: 'Australia/Sydney', label: 'Sydney / Melbourne, Australia' },
    { tz: 'Australia/Brisbane', label: 'Brisbane, Australia' },
    { tz: 'Pacific/Auckland', label: 'Auckland, New Zealand' }
  ];

  const CURATED_MAP = new Map();
  for (let i = 0; i < CURATED_ZONES.length; i++) {
    CURATED_MAP.set(CURATED_ZONES[i].tz, CURATED_ZONES[i].label);
  }

  function getAllSupportedTimezones() {
    let list = [];
    if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
      try {
        list = Intl.supportedValuesOf('timeZone');
      } catch (e) {
        list = [];
      }
    }
    const set = new Set(list);
    set.add('UTC');
    for (let i = 0; i < CURATED_ZONES.length; i++) {
      set.add(CURATED_ZONES[i].tz);
    }
    return Array.from(set).sort();
  }

  const ALL_TIMEZONES = getAllSupportedTimezones();

  // ==========================================================================
  // CACHED INTL FORMATTERS (ELIMINATES MOBILE & SEARCH LAG)
  // ==========================================================================
  const partsFormatterCache = new Map();
  const dateFormatterCache = new Map();
  const shortZoneFormatterCache = new Map();

  function getPartsFormatter(timeZone) {
    let fmt = partsFormatterCache.get(timeZone);
    if (!fmt) {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
      });
      partsFormatterCache.set(timeZone, fmt);
    }
    return fmt;
  }

  function getDateFormatter(timeZone) {
    let fmt = dateFormatterCache.get(timeZone);
    if (!fmt) {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      dateFormatterCache.set(timeZone, fmt);
    }
    return fmt;
  }

  function getShortZoneFormatter(timeZone) {
    let fmt = shortZoneFormatterCache.get(timeZone);
    if (!fmt) {
      fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        timeZoneName: 'short'
      });
      shortZoneFormatterCache.set(timeZone, fmt);
    }
    return fmt;
  }

  // DOM Elements
  const fromComboEl = document.getElementById('fromCombo');
  const toComboEl = document.getElementById('toCombo');
  const fromTzInput = document.getElementById('fromTz');
  const toTzInput = document.getElementById('toTz');
  const fromSearch = document.getElementById('fromSearch');
  const toSearch = document.getElementById('toSearch');
  const fromClear = document.getElementById('fromClear');
  const toClear = document.getElementById('toClear');
  const fromToggle = document.getElementById('fromToggle');
  const toToggle = document.getElementById('toToggle');
  const fromList = document.getElementById('fromList');
  const toList = document.getElementById('toList');

  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const fromOffsetEl = document.getElementById('fromOffset');
  const toOffsetEl = document.getElementById('toOffset');
  const fromTodEl = document.getElementById('fromTod');
  const toTodEl = document.getElementById('toTod');
  const fromFormattedDateEl = document.getElementById('fromFormattedDate');
  const fromZoneShortEl = document.getElementById('fromZoneShort');
  const toZoneShortEl = document.getElementById('toZoneShort');
  const resultTimeEl = document.getElementById('resultTime');
  const resultPeriodEl = document.getElementById('resultPeriod');
  const resultDateEl = document.getElementById('resultDate');
  const diffBadgeEl = document.getElementById('diffBadge');
  const dayShiftEl = document.getElementById('dayShift');
  const btnSwap = document.getElementById('btnSwap');
  const btnNow = document.getElementById('btnNow');
  const btnMinus1h = document.getElementById('btnMinus1h');
  const btnPlus1h = document.getElementById('btnPlus1h');
  const btn12h = document.getElementById('btn12h');
  const btn24h = document.getElementById('btn24h');
  const btnTheme = document.getElementById('btnTheme');
  const themeLabel = document.getElementById('themeLabel');
  const themeIcon = document.getElementById('themeIcon');
  const btnCopy = document.getElementById('btnCopy');
  const copyLabel = document.getElementById('copyLabel');
  const timelineScroll = document.getElementById('timelineScroll');
  const timelineGrid = document.getElementById('timelineGrid');

  let use12Hour = true;

  // Detect system theme
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  let currentTheme = darkQuery.matches ? 'dark' : 'light';

  const SUN_SVG =
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/>';
  const MOON_SVG = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  const TWILIGHT_SVG =
    '<path d="M17 18a5 5 0 0 0-10 0"/><path d="M12 9V2m-7.07 7.93l1.41 1.41M1 18h2m18 0h2m-3.66-6.66l1.41-1.41M23 22H1"/>';

  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeLabel.textContent = 'Light';
      themeIcon.innerHTML = SUN_SVG;
    } else {
      themeLabel.textContent = 'Dark';
      themeIcon.innerHTML = MOON_SVG;
    }
  }

  darkQuery.addEventListener('change', function (e) {
    applyTheme(e.matches ? 'dark' : 'light');
  });

  function updateFormatToggleUI() {
    if (use12Hour) {
      btn12h.classList.add('is-active');
      btn12h.setAttribute('aria-pressed', 'true');
      btn24h.classList.remove('is-active');
      btn24h.setAttribute('aria-pressed', 'false');
    } else {
      btn24h.classList.add('is-active');
      btn24h.setAttribute('aria-pressed', 'true');
      btn12h.classList.remove('is-active');
      btn12h.setAttribute('aria-pressed', 'false');
    }
  }

  /**
   * Extract numerical date/time parts in a given IANA timezone for a UTC Date object
   */
  function getZonedParts(dateObj, timeZone) {
    const parts = getPartsFormatter(timeZone).formatToParts(dateObj);
    const map = {};
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].type !== 'literal') {
        map[parts[i].type] = parseInt(parts[i].value, 10);
      }
    }
    if (map.hour === 24) map.hour = 0;
    return map;
  }

  /**
   * Format date with hyphen separator: e.g. "Sat - Nov 14, 2026"
   */
  function formatDateHyphenated(dateObj, timeZone) {
    const parts = getDateFormatter(timeZone).formatToParts(dateObj);
    let weekday = '';
    let month = '';
    let day = '';
    let year = '';
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      if (p.type === 'weekday') weekday = p.value;
      else if (p.type === 'month') month = p.value;
      else if (p.type === 'day') day = p.value;
      else if (p.type === 'year') year = p.value;
    }
    return weekday + ' - ' + month + ' ' + day + ', ' + year;
  }

  /**
   * Get short timezone abbreviation (e.g. "EST", "GMT+8", "UTC")
   */
  function getShortZoneName(dateObj, timeZone) {
    const parts = getShortZoneFormatter(timeZone).formatToParts(dateObj);
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].type === 'timeZoneName') {
        return parts[i].value;
      }
    }
    return timeZone;
  }

  /**
   * Get timezone offset in minutes at a specific UTC instant
   */
  function getOffsetMinutes(utcDate, timeZone) {
    const p = getZonedParts(utcDate, timeZone);
    const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second || 0);
    const utcFloor = Math.floor(utcDate.getTime() / 1000) * 1000;
    return Math.round((asUTC - utcFloor) / 60000);
  }

  /**
   * Convert wall-clock (year, month, day, hour, minute) in `sourceTz` into a UTC Date object
   */
  function wallTimeToUtcDate(year, month, day, hour, minute, sourceTz) {
    const targetWallUTC = Date.UTC(year, month - 1, day, hour, minute, 0);
    const offset1 = getOffsetMinutes(new Date(targetWallUTC), sourceTz);
    const guess1 = targetWallUTC - offset1 * 60000;
    const offset2 = getOffsetMinutes(new Date(guess1), sourceTz);
    return new Date(targetWallUTC - offset2 * 60000);
  }

  /**
   * Format offset minutes into "UTC+HH:MM" or "UTC-HH:MM"
   */
  function formatOffsetLabel(offsetMinutes) {
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const abs = Math.abs(offsetMinutes);
    const hh = String(Math.floor(abs / 60)).padStart(2, '0');
    const mm = String(abs % 60).padStart(2, '0');
    return 'UTC' + sign + hh + ':' + mm;
  }

  /**
   * Update Day / Evening / Night status badge for a given hour (0-23)
   */
  function updateTimeOfDayBadge(el, hour) {
    el.classList.remove('tod-day', 'tod-eve', 'tod-night');
    if (hour >= 7 && hour < 18) {
      el.classList.add('tod-day');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + SUN_SVG + '</svg><span>Day</span>';
    } else if ((hour >= 5 && hour < 7) || (hour >= 18 && hour < 21)) {
      el.classList.add('tod-eve');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + TWILIGHT_SVG + '</svg><span>Eve</span>';
    } else {
      el.classList.add('tod-night');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + MOON_SVG + '</svg><span>Night</span>';
    }
  }

  // ==========================================================================
  // NON-BLOCKING TIMEZONE CATALOG & UNIFIED COMBOBOX
  // ==========================================================================
  const popularCatalog = [];
  const allCatalog = [];
  let popularWarmCursor = 0;
  let allWarmCursor = 0;

  function initCatalog() {
    for (let i = 0; i < CURATED_ZONES.length; i++) {
      const item = CURATED_ZONES[i];
      popularCatalog.push({
        tz: item.tz,
        name: item.label,
        offsetStr: null,
        searchKey: (item.tz + ' ' + item.label).toLowerCase().replace(/_/g, ' ')
      });
    }

    for (let i = 0; i < ALL_TIMEZONES.length; i++) {
      const tz = ALL_TIMEZONES[i];
      const label = CURATED_MAP.get(tz) || '';
      const displayName = tz.replace(/_/g, ' ');
      allCatalog.push({
        tz: tz,
        name: displayName,
        offsetStr: null,
        searchKey: (tz + ' ' + displayName + ' ' + label).toLowerCase().replace(/_/g, ' ')
      });
    }
  }

  function resolveItemOffset(item, refDate) {
    if (item.offsetStr !== null) return item.offsetStr;
    try {
      const offsetMin = getOffsetMinutes(refDate, item.tz);
      item.offsetStr = formatOffsetLabel(offsetMin);
      item.searchKey += ' ' + item.offsetStr.toLowerCase();
    } catch (e) {
      item.offsetStr = 'UTC';
    }
    return item.offsetStr;
  }

  function scheduleChunkedWarmup() {
    const step = function () {
      const ref = new Date();
      if (popularWarmCursor < popularCatalog.length) {
        const end = Math.min(popularWarmCursor + 12, popularCatalog.length);
        for (let i = popularWarmCursor; i < end; i++) {
          resolveItemOffset(popularCatalog[i], ref);
        }
        popularWarmCursor = end;
        setTimeout(step, 16);
        return;
      }
      if (allWarmCursor < allCatalog.length) {
        const end = Math.min(allWarmCursor + 15, allCatalog.length);
        for (let i = allWarmCursor; i < end; i++) {
          resolveItemOffset(allCatalog[i], ref);
        }
        allWarmCursor = end;
        setTimeout(step, 20);
      }
    };
    setTimeout(step, 25);
  }

  function formatZoneDisplay(tz, refDate) {
    const ref = refDate || new Date();
    let offsetStr = 'UTC+00:00';
    try {
      offsetStr = formatOffsetLabel(getOffsetMinutes(ref, tz));
    } catch (e) {}
    const curatedLabel = CURATED_MAP.get(tz);
    const label = curatedLabel ? curatedLabel : tz.replace(/_/g, ' ');
    return label + ' (' + offsetStr + ')';
  }

  function createComboboxController(config) {
    const { comboEl, hiddenInput, searchInput, clearBtn, toggleBtn, listEl, onSelect } = config;
    let isOpen = false;
    let activeIndex = -1;
    let currentOptions = [];

    function syncDisplayFromValue() {
      const tz = hiddenInput.value || 'UTC';
      searchInput.value = formatZoneDisplay(tz, new Date());
      clearBtn.hidden = true;
    }

    function renderList(filterQuery) {
      const ref = new Date();
      const query = (filterQuery || '').trim().toLowerCase();
      const selectedTz = hiddenInput.value;
      listEl.innerHTML = '';
      currentOptions = [];
      activeIndex = -1;

      // Ensure popular offsets are resolved if searching by offset
      if (query && (query.includes('utc') || query.includes('+') || query.includes('-'))) {
        for (let i = popularWarmCursor; i < popularCatalog.length; i++) {
          resolveItemOffset(popularCatalog[i], ref);
        }
        popularWarmCursor = popularCatalog.length;
      }

      const frag = document.createDocumentFragment();

      const matchedPopular = [];
      for (let i = 0; i < popularCatalog.length; i++) {
        const item = popularCatalog[i];
        if (!query || item.searchKey.includes(query)) {
          matchedPopular.push(item);
        }
      }

      if (matchedPopular.length > 0) {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'combo-group-label';
        groupHeader.textContent = 'Major Cities';
        frag.appendChild(groupHeader);

        for (let i = 0; i < matchedPopular.length; i++) {
          const item = matchedPopular[i];
          const el = createOptionEl(item, selectedTz, ref);
          frag.appendChild(el);
        }
      }

      if (query) {
        const matchedAll = [];
        const maxSearchMatches = 60;
        for (let i = 0; i < allCatalog.length; i++) {
          const item = allCatalog[i];
          if (item.searchKey.includes(query)) {
            matchedAll.push(item);
            if (matchedAll.length >= maxSearchMatches) break;
          }
        }

        if (matchedAll.length > 0) {
          const groupHeader = document.createElement('div');
          groupHeader.className = 'combo-group-label';
          groupHeader.textContent = 'IANA Timezones';
          frag.appendChild(groupHeader);

          for (let i = 0; i < matchedAll.length; i++) {
            const item = matchedAll[i];
            const el = createOptionEl(item, selectedTz, ref);
            frag.appendChild(el);
          }
        }
      } else {
        // When query is empty, if selectedTz is not in Major Cities, show it right below
        if (selectedTz && !CURATED_MAP.has(selectedTz)) {
          for (let i = 0; i < allCatalog.length; i++) {
            if (allCatalog[i].tz === selectedTz) {
              const groupHeader = document.createElement('div');
              groupHeader.className = 'combo-group-label';
              groupHeader.textContent = 'Current Selection';
              frag.appendChild(groupHeader);
              frag.appendChild(createOptionEl(allCatalog[i], selectedTz, ref));
              break;
            }
          }
        }
        const hint = document.createElement('div');
        hint.className = 'combo-empty';
        hint.textContent = 'Type any city or region to search 400+ IANA timezones';
        frag.appendChild(hint);
      }

      if (currentOptions.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'combo-empty';
        empty.textContent = 'No matching timezone found';
        frag.appendChild(empty);
      }

      listEl.appendChild(frag);
    }

    function createOptionEl(item, selectedTz, refDate) {
      const opt = document.createElement('div');
      opt.className = 'combo-option' + (item.tz === selectedTz ? ' is-selected' : '');
      opt.setAttribute('role', 'option');
      opt.setAttribute('aria-selected', item.tz === selectedTz ? 'true' : 'false');
      opt.dataset.tz = item.tz;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'combo-opt-name';
      nameSpan.textContent = item.name;

      const offsetSpan = document.createElement('span');
      offsetSpan.className = 'combo-opt-offset';
      offsetSpan.textContent = resolveItemOffset(item, refDate);

      opt.appendChild(nameSpan);
      opt.appendChild(offsetSpan);

      const optionIndex = currentOptions.length;
      currentOptions.push({ el: opt, tz: item.tz });

      opt.addEventListener('mousedown', function (e) {
        // Prevent input blur before selection completes
        e.preventDefault();
      });

      opt.addEventListener('click', function () {
        selectTimezone(item.tz);
      });

      opt.addEventListener('mouseenter', function () {
        setActiveIndex(optionIndex, false);
      });

      return opt;
    }

    function setActiveIndex(idx, scrollOptionIntoDropdown) {
      if (activeIndex >= 0 && currentOptions[activeIndex]) {
        currentOptions[activeIndex].el.classList.remove('is-active');
      }
      activeIndex = idx;
      if (activeIndex >= 0 && currentOptions[activeIndex]) {
        const targetEl = currentOptions[activeIndex].el;
        targetEl.classList.add('is-active');
        if (scrollOptionIntoDropdown) {
          const top = targetEl.offsetTop;
          const bottom = top + targetEl.offsetHeight;
          if (top < listEl.scrollTop) {
            listEl.scrollTop = top - 4;
          } else if (bottom > listEl.scrollTop + listEl.clientHeight) {
            listEl.scrollTop = bottom - listEl.clientHeight + 4;
          }
        }
      }
    }

    function openDropdown(initialQuery) {
      if (!isOpen) {
        isOpen = true;
        comboEl.classList.add('is-open');
        searchInput.setAttribute('aria-expanded', 'true');
        listEl.hidden = false;
      }
      renderList(initialQuery);

      // Scroll internal dropdown list only — never touches window scroll
      if (!initialQuery) {
        const selectedOpt = listEl.querySelector('.combo-option.is-selected');
        if (selectedOpt) {
          listEl.scrollTop = Math.max(0, selectedOpt.offsetTop - listEl.clientHeight / 2 + 16);
        } else {
          listEl.scrollTop = 0;
        }
      } else {
        listEl.scrollTop = 0;
      }
    }

    function closeDropdown() {
      if (!isOpen) return;
      isOpen = false;
      comboEl.classList.remove('is-open');
      searchInput.setAttribute('aria-expanded', 'false');
      listEl.hidden = true;
      syncDisplayFromValue();
    }

    function selectTimezone(tz) {
      hiddenInput.value = tz;
      closeDropdown();
      searchInput.blur();
      onSelect(tz);
    }

    searchInput.addEventListener('focus', function () {
      searchInput.value = '';
      clearBtn.hidden = true;
      openDropdown('');
    });

    searchInput.addEventListener('input', function () {
      const q = searchInput.value;
      clearBtn.hidden = !q;
      openDropdown(q);
      if (currentOptions.length > 0) {
        setActiveIndex(0, false);
      }
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) {
          openDropdown('');
        }
        if (currentOptions.length > 0) {
          const next = activeIndex + 1 < currentOptions.length ? activeIndex + 1 : 0;
          setActiveIndex(next, true);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) {
          openDropdown('');
        }
        if (currentOptions.length > 0) {
          const prev = activeIndex - 1 >= 0 ? activeIndex - 1 : currentOptions.length - 1;
          setActiveIndex(prev, true);
        }
      } else if (e.key === 'Enter') {
        if (isOpen && currentOptions.length > 0) {
          e.preventDefault();
          const chosen = activeIndex >= 0 ? currentOptions[activeIndex] : currentOptions[0];
          if (chosen) {
            selectTimezone(chosen.tz);
          }
        }
      } else if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          closeDropdown();
          searchInput.blur();
        }
      }
    });

    clearBtn.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    clearBtn.addEventListener('click', function () {
      searchInput.value = '';
      clearBtn.hidden = true;
      openDropdown('');
      searchInput.focus({ preventScroll: true });
    });

    toggleBtn.addEventListener('mousedown', function (e) {
      e.preventDefault();
    });

    toggleBtn.addEventListener('click', function () {
      if (isOpen) {
        closeDropdown();
        searchInput.blur();
      } else {
        searchInput.focus({ preventScroll: true });
      }
    });

    document.addEventListener('mousedown', function (e) {
      if (isOpen && !comboEl.contains(e.target)) {
        closeDropdown();
      }
    });

    return {
      setValue: function (tz) {
        hiddenInput.value = tz;
        syncDisplayFromValue();
      },
      getValue: function () {
        return hiddenInput.value;
      },
      refreshDisplay: syncDisplayFromValue
    };
  }

  /**
   * Set Date & Time inputs to a specific UTC Date expressed in the "From" timezone
   */
  function setInputsFromUtcDate(utcDate) {
    const fromTz = fromTzInput.value || 'UTC';
    const parts = getZonedParts(utcDate, fromTz);
    const yyyy = String(parts.year).padStart(4, '0');
    const mm = String(parts.month).padStart(2, '0');
    const dd = String(parts.day).padStart(2, '0');
    const hh = String(parts.hour).padStart(2, '0');
    const min = String(parts.minute).padStart(2, '0');

    dateInput.value = yyyy + '-' + mm + '-' + dd;
    timeInput.value = hh + ':' + min;
  }

  /**
   * Format timeline hour with descriptive AM / PM or 24h
   */
  function formatTimelineHour(h) {
    if (!use12Hour) {
      return String(h).padStart(2, '0') + ':00';
    }
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return h12 + ' ' + period;
  }

  // ==========================================================================
  // REUSABLE 24-HOUR TIMELINE DOM (NO SCROLL-TO-BOTTOM BUG, NO DOM THRASHING)
  // ==========================================================================
  const timelineSlots = [];
  let activeTimelineMinute = 0;

  function initTimelineDOM() {
    timelineGrid.innerHTML = '';
    const frag = document.createDocumentFragment();

    for (let h = 0; h < 24; h++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hour-slot slot-day';

      const fromSpan = document.createElement('span');
      fromSpan.className = 'slot-from';

      const divSpan = document.createElement('span');
      divSpan.className = 'slot-divider';

      const toSpan = document.createElement('span');
      toSpan.className = 'slot-to';

      btn.appendChild(fromSpan);
      btn.appendChild(divSpan);
      btn.appendChild(toSpan);

      btn.addEventListener('click', function () {
        timeInput.value =
          String(h).padStart(2, '0') + ':' + String(activeTimelineMinute).padStart(2, '0');
        convertAndRender({ scrollTimeline: true });
      });

      timelineSlots.push({ btn: btn, fromSpan: fromSpan, toSpan: toSpan });
      frag.appendChild(btn);
    }

    timelineGrid.appendChild(frag);
  }

  /**
   * Update the 24-hour visual comparison scrubber in-place and horizontally center active slot
   */
  function renderTimeline(year, month, day, activeHour, minute, fromTz, toTz, shouldScrollHorizontally) {
    activeTimelineMinute = minute;

    for (let h = 0; h < 24; h++) {
      const slotUtc = wallTimeToUtcDate(year, month, day, h, minute, fromTz);
      const toParts = getZonedParts(slotUtc, toTz);
      const toH = toParts.hour;

      const bothWork = h >= 9 && h < 17 && toH >= 9 && toH < 17;
      const bothDay = h >= 7 && h < 21 && toH >= 7 && toH < 21;

      const slotObj = timelineSlots[h];
      let cls = 'hour-slot ';
      if (bothWork) {
        cls += 'slot-work';
      } else if (bothDay) {
        cls += 'slot-day';
      } else {
        cls += 'slot-night';
      }

      if (h === activeHour) {
        cls += ' is-selected';
      }

      slotObj.btn.className = cls;

      const fromLabel = formatTimelineHour(h);
      const toLabel = formatTimelineHour(toH);
      slotObj.btn.title = 'Select ' + fromLabel + ' (' + toLabel + ' in target timezone)';
      slotObj.fromSpan.textContent = fromLabel;
      slotObj.toSpan.textContent = toLabel;
    }

    // Strictly horizontal scroll inside .timeline-scroll (NEVER scrolls the page vertically!)
    if (shouldScrollHorizontally && timelineScroll && timelineSlots[activeHour]) {
      const selectedBtn = timelineSlots[activeHour].btn;
      const targetLeft =
        selectedBtn.offsetLeft -
        timelineScroll.clientWidth / 2 +
        selectedBtn.offsetWidth / 2;
      timelineScroll.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }
  }

  /**
   * Perform instant timezone conversion and update UI
   */
  function convertAndRender(options) {
    const opts = options || { scrollTimeline: true };
    const fromTz = fromTzInput.value;
    const toTz = toTzInput.value;
    const dateVal = dateInput.value;
    const timeVal = timeInput.value;

    if (!fromTz || !toTz || !dateVal || !timeVal) {
      resultTimeEl.textContent = '--:--';
      resultPeriodEl.hidden = true;
      resultDateEl.textContent = 'Select a valid date and time';
      diffBadgeEl.textContent = '--';
      dayShiftEl.hidden = true;
      return;
    }

    const dateParts = dateVal.split('-').map(Number);
    const timeParts = timeVal.split(':').map(Number);
    if (dateParts.length < 3 || timeParts.length < 2) return;

    const [year, month, day] = dateParts;
    const [hour, minute] = timeParts;

    const utcInstant = wallTimeToUtcDate(year, month, day, hour, minute, fromTz);

    // Offsets
    const fromOffsetMin = getOffsetMinutes(utcInstant, fromTz);
    const toOffsetMin = getOffsetMinutes(utcInstant, toTz);
    fromOffsetEl.textContent = formatOffsetLabel(fromOffsetMin);
    toOffsetEl.textContent = formatOffsetLabel(toOffsetMin);

    // Day/Evening/Night status pills
    const toParts = getZonedParts(utcInstant, toTz);
    updateTimeOfDayBadge(fromTodEl, hour);
    updateTimeOfDayBadge(toTodEl, toParts.hour);

    // Source summary line
    const fromTimeStr = formatClockParts(hour, minute, use12Hour);
    fromFormattedDateEl.textContent =
      formatDateHyphenated(utcInstant, fromTz) + ' • ' + fromTimeStr.full;
    fromZoneShortEl.textContent = getShortZoneName(utcInstant, fromTz);

    // Target converted time with explicit AM/PM badge
    const toTimeStr = formatClockParts(toParts.hour, toParts.minute, use12Hour);
    resultTimeEl.textContent = toTimeStr.digits;
    if (use12Hour) {
      resultPeriodEl.hidden = false;
      resultPeriodEl.textContent = toTimeStr.period;
    } else {
      resultPeriodEl.hidden = true;
    }

    // Target converted date
    resultDateEl.textContent = formatDateHyphenated(utcInstant, toTz);
    toZoneShortEl.textContent = getShortZoneName(utcInstant, toTz);

    // Time difference badge
    const diffMin = toOffsetMin - fromOffsetMin;
    if (diffMin === 0) {
      diffBadgeEl.textContent = 'Same time';
    } else {
      const sign = diffMin > 0 ? '+' : '-';
      const absMin = Math.abs(diffMin);
      const h = Math.floor(absMin / 60);
      const m = absMin % 60;
      diffBadgeEl.textContent = sign + h + (m ? 'h ' + m + 'm' : 'h');
    }

    // Day boundary comparison
    const sourceDayUTC = Date.UTC(year, month - 1, day);
    const targetDayUTC = Date.UTC(toParts.year, toParts.month - 1, toParts.day);
    const dayDelta = Math.round((targetDayUTC - sourceDayUTC) / 86400000);

    if (dayDelta === 0) {
      dayShiftEl.hidden = true;
    } else {
      dayShiftEl.hidden = false;
      if (dayDelta === 1) {
        dayShiftEl.textContent = '+1 day';
      } else if (dayDelta === -1) {
        dayShiftEl.textContent = '-1 day';
      } else {
        dayShiftEl.textContent = (dayDelta > 0 ? '+' : '') + dayDelta + ' days';
      }
    }

    // Update 24h timeline scrubber
    renderTimeline(year, month, day, hour, minute, fromTz, toTz, opts.scrollTimeline !== false);
  }

  /**
   * Helper to format hour & minute into digits + explicit "AM" / "PM"
   */
  function formatClockParts(hour24, minute, is12h) {
    const mm = String(minute).padStart(2, '0');
    if (!is12h) {
      const hh24 = String(hour24).padStart(2, '0');
      return {
        digits: hh24 + ':' + mm,
        period: '',
        full: hh24 + ':' + mm
      };
    }
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const h12 = hour24 % 12 || 12;
    const digits = String(h12).padStart(2, '0') + ':' + mm;
    return {
      digits: digits,
      period: period,
      full: digits + ' ' + period
    };
  }

  /**
   * Shift current input time by `deltaMinutes`
   */
  function shiftInputTime(deltaMinutes) {
    const fromTz = fromTzInput.value || 'UTC';
    const dateParts = (dateInput.value || '').split('-').map(Number);
    const timeParts = (timeInput.value || '').split(':').map(Number);
    if (dateParts.length < 3 || timeParts.length < 2) return;

    const utcInstant = wallTimeToUtcDate(
      dateParts[0],
      dateParts[1],
      dateParts[2],
      timeParts[0],
      timeParts[1],
      fromTz
    );
    const shifted = new Date(utcInstant.getTime() + deltaMinutes * 60000);
    setInputsFromUtcDate(shifted);
    convertAndRender({ scrollTimeline: true });
  }

  // ==========================================================================
  // INITIALIZATION & EVENT LISTENERS
  // ==========================================================================
  const detectedLocalTz =
    (Intl.DateTimeFormat().resolvedOptions && Intl.DateTimeFormat().resolvedOptions().timeZone) || 'UTC';
  const defaultToTz = detectedLocalTz === 'UTC' ? 'America/New_York' : 'UTC';

  applyTheme(currentTheme);
  updateFormatToggleUI();
  initTimelineDOM();

  const fromCombo = createComboboxController({
    comboEl: fromComboEl,
    hiddenInput: fromTzInput,
    searchInput: fromSearch,
    clearBtn: fromClear,
    toggleBtn: fromToggle,
    listEl: fromList,
    onSelect: function () {
      convertAndRender({ scrollTimeline: true });
    }
  });

  const toCombo = createComboboxController({
    comboEl: toComboEl,
    hiddenInput: toTzInput,
    searchInput: toSearch,
    clearBtn: toClear,
    toggleBtn: toToggle,
    listEl: toList,
    onSelect: function () {
      convertAndRender({ scrollTimeline: true });
    }
  });

  const nowInit = new Date();
  initCatalog();
  fromCombo.setValue(detectedLocalTz);
  toCombo.setValue(defaultToTz);
  setInputsFromUtcDate(nowInit);
  convertAndRender({ scrollTimeline: true });

  // Warm up remaining IANA offsets in tiny non-blocking chunks
  scheduleChunkedWarmup();

  dateInput.addEventListener('input', function () {
    convertAndRender({ scrollTimeline: false });
  });
  dateInput.addEventListener('change', function () {
    convertAndRender({ scrollTimeline: true });
  });
  timeInput.addEventListener('input', function () {
    convertAndRender({ scrollTimeline: false });
  });
  timeInput.addEventListener('change', function () {
    convertAndRender({ scrollTimeline: true });
  });

  btnSwap.addEventListener('click', function () {
    btnSwap.classList.add('is-rotating');
    setTimeout(function () {
      btnSwap.classList.remove('is-rotating');
    }, 220);

    const tempFrom = fromCombo.getValue();
    const tempTo = toCombo.getValue();
    fromCombo.setValue(tempTo);
    toCombo.setValue(tempFrom);
    convertAndRender({ scrollTimeline: true });
  });

  btnNow.addEventListener('click', function () {
    setInputsFromUtcDate(new Date());
    convertAndRender({ scrollTimeline: true });
  });

  btnMinus1h.addEventListener('click', function () {
    shiftInputTime(-60);
  });

  btnPlus1h.addEventListener('click', function () {
    shiftInputTime(60);
  });

  btn12h.addEventListener('click', function () {
    if (!use12Hour) {
      use12Hour = true;
      updateFormatToggleUI();
      convertAndRender({ scrollTimeline: false });
    }
  });

  btn24h.addEventListener('click', function () {
    if (use12Hour) {
      use12Hour = false;
      updateFormatToggleUI();
      convertAndRender({ scrollTimeline: false });
    }
  });

  btnTheme.addEventListener('click', function () {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  btnCopy.addEventListener('click', function () {
    const periodPart = !resultPeriodEl.hidden ? ' ' + resultPeriodEl.textContent : '';
    const textToCopy =
      resultTimeEl.textContent +
      periodPart +
      ' (' +
      toZoneShortEl.textContent +
      ') — ' +
      resultDateEl.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(function () {});
    }
    copyLabel.textContent = 'Copied';
    setTimeout(function () {
      copyLabel.textContent = 'Copy';
    }, 1200);
  });
})();
