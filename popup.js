const basePath = 'https://mfus.tk';

chrome.tabs.query({
  'active': true,
  'currentWindow': true
}, tabs => {
  const currentUrl = tabs.pop().url;
  fetch(`${basePath}/short`, {
      'method': 'POST',
      'mode': 'cors',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        longUrl: currentUrl
      })
    })
    .then(res => res.json())
    .then(res => {
      const shortUrl = `${basePath}/${res.short}`
      const codeInput = document.getElementById('code');
      document.getElementById('result').classList.toggle('hidden');
      document.getElementById('spinner').classList.toggle('hidden');

      codeInput.value = shortUrl;
      codeInput.focus();
      codeInput.onkeypress = key => {
        if (key.charCode === 13) {
          codeInput.select();
          document.execCommand('copy');
        }
      }
    });
});
