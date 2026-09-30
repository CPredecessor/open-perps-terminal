(() => {
  const modal = document.getElementById('suggestion-dialog');
  const form = document.getElementById('suggestion-form');
  const status = document.getElementById('suggestion-status');
  const submit = document.getElementById('suggestion-submit');
  let token = '', loading = false, sent = false, sequence = 0;

  async function openSuggestion(kind, name = '') {
    if (loading) return;
    if (sent) { form.reset(); sent = false; }
    document.getElementById('detail').close();
    form.elements.kind.value = kind;
    if (name) form.elements.name.value = name;
    document.getElementById('suggestion-title').textContent = kind === 'correction' ? 'Correct program data' : 'Suggest a missing DEX';
    modal.showModal();
    status.textContent = 'Preparing the form…'; submit.disabled = true; token = '';
    const current = ++sequence;
    try {
      const response = await fetch('/api/submission-token', { cache: 'no-store', signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (typeof data.token !== 'string') throw new Error();
      if (current !== sequence) return;
      token = data.token; status.textContent = ''; submit.disabled = false;
    } catch {
      if (current === sequence) status.textContent = 'Submissions are temporarily unavailable here. Your text stays in the form; close and reopen it to retry.';
    }
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-suggest]');
    if (button) openSuggestion(button.dataset.suggest, button.dataset.exchange || '');
  });
  document.getElementById('suggestion-close').addEventListener('click', () => modal.close());
  modal.addEventListener('close', () => { if (!loading) { sequence++; token = ''; submit.disabled = true; } });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (loading || sent || !token || !form.reportValidity()) return;
    loading = true; submit.disabled = true; form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending…';
    const payload = Object.fromEntries(new FormData(form)); payload.token = token;
    try {
      const response = await fetch('/api/submissions', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Submission could not be saved. Please try again.');
      if (response.status !== 201 || typeof result.id !== 'string') throw new Error('Receipt could not be verified. Please try again.');
      sent = true;
      status.textContent = 'Received — thank you! We will review it before making changes. Receipt: ' + result.id;
    } catch (error) {
      status.textContent = error.name === 'TimeoutError' ? 'The request timed out. Keep your text and retry; the same submission will not be saved twice.' :
        error.name === 'TypeError' || error instanceof SyntaxError ? 'Could not reach the submission service. Your text is still here; please retry later.' : error.message;
    } finally {
      loading = false; submit.disabled = sent; form.removeAttribute('aria-busy');
    }
  });
})();
