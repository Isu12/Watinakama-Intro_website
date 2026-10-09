/* Watinakama.LK research website - small progressive enhancements.
   Every page is fully readable without this file. */
(function () {
  'use strict';

  // Milestones: the drop-down shows one assessment at a time.
  var picker = document.getElementById('milestone-picker');
  if (picker) {
    var panels = document.querySelectorAll('.milestone');
    var show = function (id) {
      for (var i = 0; i < panels.length; i++) {
        panels[i].hidden = id !== 'all' && panels[i].id !== id;
      }
    };
    picker.addEventListener('change', function () {
      show(picker.value);
      if (history.replaceState) {
        history.replaceState(null, '', picker.value === 'all' ? location.pathname : '#' + picker.value);
      }
    });
    // Links such as milestones.html#pp1 select that assessment.
    var syncFromHash = function () {
      var id = location.hash.replace('#', '');
      var target = id && document.getElementById(id);
      if (target && target.className.indexOf('milestone') !== -1) {
        picker.value = id;
        show(id);
        target.scrollIntoView();
      }
    };
    window.addEventListener('hashchange', syncFromHash);
    show(picker.value);
    syncFromHash();
  }

  // Contact: build an e-mail in the visitor's own mail client from the form.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (n) { return form.elements[n].value.trim(); };
      var body = 'Dear Watinakama.LK Team,\n\n' + v('message') +
        '\n\nKind regards,\n' + v('name') + '\n' + v('affiliation') + '\n' + v('email');
      location.href = 'mailto:' + form.getAttribute('data-to') +
        '?subject=' + encodeURIComponent('[Watinakama.LK] ' + v('subject')) +
        '&body=' + encodeURIComponent(body);
    });
  }

  // Contact: copy the e-mail template text.
  var copy = document.getElementById('copy-template');
  if (copy) {
    if (!navigator.clipboard) {
      copy.hidden = true;
    } else {
      copy.addEventListener('click', function () {
        navigator.clipboard.writeText(document.getElementById('email-template-text').textContent).then(function () {
          copy.textContent = 'Copied';
          setTimeout(function () { copy.textContent = 'Copy template text'; }, 1800);
        });
      });
    }
  }
})();
