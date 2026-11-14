(function () {
  'use strict';

  // Curated Major World Cities / Zones
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

  // DOM Elements
  const fromSearch = document.getElementById('fromSearch');
  const toSearch = document.getElementById('toSearch');
  const fromClear = document.getElementById('fromClear');
  const toClear = document.getElementById('toClear');
  const fromTzSelect = document.getElementById('fromTz');
  const toTzSelect = document.getElementById('toTz');
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
  const timelineGrid = document.getElementById('timelineGrid');
  const skyCanvas = document.getElementById('skyCanvas');

  // Default to 12-hour format so AM / PM is clearly visible (user can switch to 24h anytime)
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
      themeLabel.textContent = 'Day Mode';
      themeIcon.innerHTML = SUN_SVG;
    } else {
      themeLabel.textContent = 'Night Mode';
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
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23'
    });
    const parts = dtf.formatToParts(dateObj);
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
   * Format date with hyphen separator instead of comma: e.g. "Sat - Nov 14, 2026"
   */
  function formatDateHyphenated(dateObj, timeZone) {
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    const parts = dtf.formatToParts(dateObj);
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
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      timeZoneName: 'short'
    });
    const part = dtf.formatToParts(dateObj).find(function (p) {
      return p.type === 'timeZoneName';
    });
    return part ? part.value : timeZone;
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
    let guess = targetWallUTC;
    for (let i = 0; i < 3; i++) {
      const offsetMin = getOffsetMinutes(new Date(guess), sourceTz);
      guess = targetWallUTC - offsetMin * 60000;
    }
    return new Date(guess);
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
      el.innerHTML = '<svg viewBox="0 0 24 24">' + SUN_SVG + '</svg><span>Daytime</span>';
    } else if ((hour >= 5 && hour < 7) || (hour >= 18 && hour < 21)) {
      el.classList.add('tod-eve');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + TWILIGHT_SVG + '</svg><span>Evening</span>';
    } else {
      el.classList.add('tod-night');
      el.innerHTML = '<svg viewBox="0 0 24 24">' + MOON_SVG + '</svg><span>Night</span>';
    }
  }

  /**
   * Populate a timezone <select> dropdown with optional search filter
   */
  function populateSelect(selectEl, filterText, selectedTz, referenceDate) {
    const query = (filterText || '').trim().toLowerCase();
    const ref = referenceDate || new Date();
    selectEl.innerHTML = '';

    const matchZone = function (tz, label, offsetStr) {
      if (!query) return true;
      const haystack = (tz + ' ' + (label || '') + ' ' + offsetStr)
        .toLowerCase()
        .replace(/_/g, ' ');
      return haystack.includes(query);
    };

    const popularGroup = document.createElement('optgroup');
    popularGroup.label = 'Major World Cities';
    let popularCount = 0;

    for (let i = 0; i < CURATED_ZONES.length; i++) {
      const item = CURATED_ZONES[i];
      try {
        const offsetMin = getOffsetMinutes(ref, item.tz);
        const offsetStr = formatOffsetLabel(offsetMin);
        if (matchZone(item.tz, item.label, offsetStr)) {
          const opt = document.createElement('option');
          opt.value = item.tz;
          opt.textContent = item.label + ' (' + offsetStr + ')';
          popularGroup.appendChild(opt);
          popularCount++;
        }
      } catch (e) {}
    }
    if (popularCount > 0) {
      selectEl.appendChild(popularGroup);
    }

    const allGroup = document.createElement('optgroup');
    allGroup.label = 'All IANA Timezones';
    let allCount = 0;

    for (let i = 0; i < ALL_TIMEZONES.length; i++) {
      const tz = ALL_TIMEZONES[i];
      try {
        const offsetMin = getOffsetMinutes(ref, tz);
        const offsetStr = formatOffsetLabel(offsetMin);
        if (matchZone(tz, '', offsetStr)) {
          const opt = document.createElement('option');
          opt.value = tz;
          opt.textContent = tz.replace(/_/g, ' ') + ' (' + offsetStr + ')';
          allGroup.appendChild(opt);
          allCount++;
        }
      } catch (e) {}
    }
    if (allCount > 0) {
      selectEl.appendChild(allGroup);
    }

    const options = selectEl.options;
    let found = false;
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === selectedTz) {
        selectEl.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found && options.length > 0) {
      selectEl.selectedIndex = 0;
    }
  }

  /**
   * Set Date & Time inputs to a specific UTC Date expressed in the "From" timezone
   */
  function setInputsFromUtcDate(utcDate) {
    const fromTz = fromTzSelect.value || 'UTC';
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
   * Format timeline hour with full descriptive "AM" / "PM" instead of "a" / "p"
   */
  function formatTimelineHour(h) {
    if (!use12Hour) {
      return String(h).padStart(2, '0') + ':00';
    }
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return h12 + ' ' + period;
  }

  /**
   * Render the 24-hour visual comparison scrubber
   */
  function renderTimeline(year, month, day, activeHour, minute, fromTz, toTz) {
    timelineGrid.innerHTML = '';
    for (let h = 0; h < 24; h++) {
      const slotUtc = wallTimeToUtcDate(year, month, day, h, minute, fromTz);
      const toParts = getZonedParts(slotUtc, toTz);
      const toH = toParts.hour;

      const bothWork = h >= 9 && h < 17 && toH >= 9 && toH < 17;
      const bothDay = h >= 7 && h < 21 && toH >= 7 && toH < 21;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hour-slot ';
      if (bothWork) {
        btn.className += 'slot-work';
      } else if (bothDay) {
        btn.className += 'slot-day';
      } else {
        btn.className += 'slot-night';
      }

      if (h === activeHour) {
        btn.className += ' is-selected';
      }

      const fromLabel = formatTimelineHour(h);
      const toLabel = formatTimelineHour(toH);
      btn.title = 'Select ' + fromLabel + ' (' + toLabel + ' in target timezone)';
      btn.innerHTML =
        '<span class="slot-from">' +
        fromLabel +
        '</span>' +
        '<span class="slot-divider"></span>' +
        '<span class="slot-to">' +
        toLabel +
        '</span>';

      btn.addEventListener('click', function () {
        timeInput.value = String(h).padStart(2, '0') + ':' + String(minute).padStart(2, '0');
        convertAndRender();
      });

      timelineGrid.appendChild(btn);
    }

    // Auto-scroll active hour slot into view smoothly
    const selectedEl = timelineGrid.querySelector('.hour-slot.is-selected');
    if (selectedEl && typeof selectedEl.scrollIntoView === 'function') {
      selectedEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  /**
   * Perform instant timezone conversion and update UI
   */
  function convertAndRender() {
    const fromTz = fromTzSelect.value;
    const toTz = toTzSelect.value;
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

    // Source summary line with "Sat - Nov 14, 2026" format + short zone tag
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

    // Target converted date with "Sat - Nov 14, 2026" format
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
      diffBadgeEl.textContent = sign + h + (m ? ' hr ' + m + ' min' : h === 1 ? ' hr' : ' hrs');
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
        dayShiftEl.textContent = '+1 day (Tomorrow)';
      } else if (dayDelta === -1) {
        dayShiftEl.textContent = '-1 day (Yesterday)';
      } else {
        dayShiftEl.textContent = (dayDelta > 0 ? '+' : '') + dayDelta + ' days';
      }
    }

    // Update 24h timeline scrubber
    renderTimeline(year, month, day, hour, minute, fromTz, toTz);
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
    const fromTz = fromTzSelect.value || 'UTC';
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
    convertAndRender();
  }

  // ==========================================================================
  // LIVE 60FPS SKY ENGINE (MOVING CLOUDS & MOVING STARS)
  // ==========================================================================
  function initSkyCanvas() {
    if (!skyCanvas || !skyCanvas.getContext) return;
    const ctx = skyCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const stars = [];
    const STAR_COLORS = ['#ffffff', '#e0f2fe', '#bae6fd', '#fef9c3'];
    const STAR_COUNT = 150;

    for (let i = 0; i < STAR_COUNT; i++) {
      const z = 0.25 + Math.random() * 0.75;
      stars.push({
        xFrac: Math.random(),
        yFrac: Math.random() * 0.88,
        z: z,
        radius: (0.6 + Math.random() * 1.5) * z,
        speedX: (0.008 + Math.random() * 0.016) * z,
        speedY: (Math.random() - 0.5) * 0.003 * z,
        twinkleSpeed: 0.015 + Math.random() * 0.03,
        twinklePhase: Math.random() * Math.PI * 2,
        color: STAR_COLORS[i % STAR_COLORS.length]
      });
    }

    const meteors = [];
    function maybeSpawnMeteor() {
      if (currentTheme !== 'dark') return;
      if (meteors.length < 2 && Math.random() < 0.007) {
        meteors.push({
          x: Math.random() * width * 0.85 + width * 0.1,
          y: Math.random() * height * 0.35,
          vx: -(6 + Math.random() * 5),
          vy: 3 + Math.random() * 3,
          len: 65 + Math.random() * 55,
          life: 0,
          maxLife: 45 + Math.random() * 20
        });
      }
    }

    const clouds = [];
    const CLOUD_COUNT = 11;

    function createCloud(index) {
      const layer = index % 3;
      const z = layer === 0 ? 0.45 : layer === 1 ? 0.72 : 1.0;
      const baseScale = (0.62 + Math.random() * 0.48) * z;
      const puffs = [
        { dx: -68, dy: 14, rx: 46, ry: 26 },
        { dx: -32, dy: -2, rx: 56, ry: 34 },
        { dx: 12, dy: -10, rx: 64, ry: 38 },
        { dx: 54, dy: 0, rx: 50, ry: 30 },
        { dx: 86, dy: 14, rx: 38, ry: 22 },
        { dx: -8, dy: 16, rx: 58, ry: 26 },
        { dx: 34, dy: 18, rx: 52, ry: 24 }
      ];
      return {
        xFrac: index / CLOUD_COUNT + (Math.random() * 0.06 - 0.03),
        yFrac: 0.06 + (index % 5) * 0.16 + Math.random() * 0.05,
        z: z,
        scale: baseScale,
        speed: (8 + Math.random() * 10) * z,
        bobPhase: Math.random() * Math.PI * 2,
        bobSpeed: 0.3 + Math.random() * 0.35,
        puffs: puffs
      };
    }

    for (let i = 0; i < CLOUD_COUNT; i++) {
      clouds.push(createCloud(i));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      skyCanvas.width = Math.floor(width * dpr);
      skyCanvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    let nightAlpha = currentTheme === 'dark' ? 1 : 0;
    let lastTime = performance.now();

    function drawVolumetricCloud(c, px, py, isNightFactor) {
      const viewportFactor = width < 540 ? 0.62 : width < 820 ? 0.82 : 1.0;
      const s = c.scale * viewportFactor;
      ctx.save();
      ctx.translate(px, py);

      for (let i = 0; i < c.puffs.length; i++) {
        const p = c.puffs[i];
        const cx = p.dx * s;
        const cy = p.dy * s;
        const rx = p.rx * s;
        const ry = p.ry * s;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1, ry / rx);

        const grad = ctx.createRadialGradient(-rx * 0.18, -rx * 0.28, rx * 0.05, 0, rx * 0.1, rx);

        if (isNightFactor < 0.5) {
          const alpha = 0.36 * c.z;
          grad.addColorStop(0, 'rgba(255, 255, 255, ' + alpha * 1.25 + ')');
          grad.addColorStop(0.5, 'rgba(248, 252, 255, ' + alpha * 0.9 + ')');
          grad.addColorStop(0.82, 'rgba(214, 234, 252, ' + alpha * 0.45 + ')');
          grad.addColorStop(1, 'rgba(186, 218, 248, 0)');
        } else {
          const alpha = 0.15 * c.z;
          grad.addColorStop(0, 'rgba(148, 163, 184, ' + alpha + ')');
          grad.addColorStop(0.55, 'rgba(51, 65, 85, ' + alpha * 0.75 + ')');
          grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    }

    function animate(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const targetNight = currentTheme === 'dark' ? 1 : 0;
      nightAlpha += (targetNight - nightAlpha) * Math.min(1, dt * 4);

      ctx.clearRect(0, 0, width, height);

      if (nightAlpha > 0.01) {
        ctx.save();
        for (let i = 0; i < stars.length; i++) {
          const st = stars[i];
          st.xFrac += ((st.speedX * dt) / Math.max(width, 600)) * 60;
          st.yFrac += ((st.speedY * dt) / Math.max(height, 600)) * 60;

          if (st.xFrac > 1.02) st.xFrac = -0.02;
          if (st.xFrac < -0.02) st.xFrac = 1.02;
          if (st.yFrac > 0.9) st.yFrac = 0.02;
          if (st.yFrac < 0.01) st.yFrac = 0.88;

          st.twinklePhase += st.twinkleSpeed;
          const twinkle = 0.45 + 0.55 * Math.sin(st.twinklePhase);
          const alpha = twinkle * nightAlpha * st.z;

          const sx = st.xFrac * width;
          const sy = st.yFrac * height;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = st.color;
          ctx.beginPath();
          ctx.arc(sx, sy, st.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        maybeSpawnMeteor();
        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.x += m.vx;
          m.y += m.vy;
          m.life += 1;

          const progress = m.life / m.maxLife;
          const mAlpha = Math.sin(progress * Math.PI) * nightAlpha;

          const tailX = m.x - m.vx * (m.len / 8);
          const tailY = m.y - m.vy * (m.len / 8);
          const mGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          mGrad.addColorStop(0, 'rgba(255, 255, 255, ' + mAlpha + ')');
          mGrad.addColorStop(0.4, 'rgba(186, 230, 253, ' + mAlpha * 0.5 + ')');
          mGrad.addColorStop(1, 'rgba(186, 230, 253, 0)');

          ctx.strokeStyle = mGrad;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          if (m.life >= m.maxLife) {
            meteors.splice(i, 1);
          }
        }
        ctx.restore();
      }

      const wrapMargin = 220;
      const totalSpan = width + wrapMargin * 2;

      for (let i = 0; i < clouds.length; i++) {
        const c = clouds[i];
        c.xFrac += (c.speed * dt) / totalSpan;
        if (c.xFrac > 1) {
          c.xFrac -= 1;
        }
        c.bobPhase += c.bobSpeed * dt;

        const px = -wrapMargin + c.xFrac * totalSpan;
        const py = c.yFrac * height + Math.sin(c.bobPhase) * 5 * c.z;

        drawVolumetricCloud(c, px, py, nightAlpha);
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  // Initialize defaults
  const detectedLocalTz =
    (Intl.DateTimeFormat().resolvedOptions && Intl.DateTimeFormat().resolvedOptions().timeZone) || 'UTC';
  const defaultToTz = detectedLocalTz === 'UTC' ? 'America/New_York' : 'UTC';

  applyTheme(currentTheme);
  updateFormatToggleUI();

  const nowInit = new Date();
  populateSelect(fromTzSelect, '', detectedLocalTz, nowInit);
  populateSelect(toTzSelect, '', defaultToTz, nowInit);
  setInputsFromUtcDate(nowInit);
  convertAndRender();

  initSkyCanvas();

  // Event Listeners
  dateInput.addEventListener('input', convertAndRender);
  dateInput.addEventListener('change', convertAndRender);
  timeInput.addEventListener('input', convertAndRender);
  timeInput.addEventListener('change', convertAndRender);
  fromTzSelect.addEventListener('change', convertAndRender);
  toTzSelect.addEventListener('change', convertAndRender);

  fromSearch.addEventListener('input', function () {
    fromClear.hidden = !fromSearch.value;
    const current = fromTzSelect.value;
    populateSelect(fromTzSelect, fromSearch.value, current, new Date());
    convertAndRender();
  });

  fromClear.addEventListener('click', function () {
    fromSearch.value = '';
    fromClear.hidden = true;
    populateSelect(fromTzSelect, '', fromTzSelect.value, new Date());
    convertAndRender();
    fromSearch.focus();
  });

  toSearch.addEventListener('input', function () {
    toClear.hidden = !toSearch.value;
    const current = toTzSelect.value;
    populateSelect(toTzSelect, toSearch.value, current, new Date());
    convertAndRender();
  });

  toClear.addEventListener('click', function () {
    toSearch.value = '';
    toClear.hidden = true;
    populateSelect(toTzSelect, '', toTzSelect.value, new Date());
    convertAndRender();
    toSearch.focus();
  });

  btnSwap.addEventListener('click', function () {
    btnSwap.classList.add('is-rotating');
    setTimeout(function () {
      btnSwap.classList.remove('is-rotating');
    }, 280);

    const tempTz = fromTzSelect.value;
    const tempSearch = fromSearch.value;
    const targetTz = toTzSelect.value;
    const targetSearch = toSearch.value;

    fromSearch.value = targetSearch;
    toSearch.value = tempSearch;
    fromClear.hidden = !fromSearch.value;
    toClear.hidden = !toSearch.value;

    const ref = new Date();
    populateSelect(fromTzSelect, fromSearch.value, targetTz, ref);
    populateSelect(toTzSelect, toSearch.value, tempTz, ref);
    convertAndRender();
  });

  btnNow.addEventListener('click', function () {
    setInputsFromUtcDate(new Date());
    convertAndRender();
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
      convertAndRender();
    }
  });

  btn24h.addEventListener('click', function () {
    if (use12Hour) {
      use12Hour = false;
      updateFormatToggleUI();
      convertAndRender();
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
    copyLabel.textContent = 'Copied!';
    setTimeout(function () {
      copyLabel.textContent = 'Copy';
    }, 1400);
  });
})();
