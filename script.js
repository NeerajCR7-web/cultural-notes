document.getElementById('generate').addEventListener('click', async () => {
  const input = document.getElementById('transcript').value.trim();
  const output = document.getElementById('output');

  if (!input) {
    output.textContent = 'Please enter a keyword or phrase.';
    return;
  }

  output.textContent = 'Generating cultural insight...';

  const prompt = `
You are a cultural expert. A user types a word, phrase, or idea.
Explain:
1. What it refers to culturally (region, custom, tradition, pop culture, etc.)
2. Why it is culturally or socially significant.

Input: "${input}"
Cultural Insight & Significance:
`;

  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer jI9jy69rGL3iLZqbHMnjm6FNc9GjAZtgRVGlNeKh', // 🔁 Replace this with your actual key
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06'
      },
      body: JSON.stringify({
        model: 'command',
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.8
      })
    });

    const data = await response.json();
    const result = data.generations?.[0]?.text?.trim();

    output.textContent = result || 'No cultural insight was generated.';
  } catch (err) {
    console.error(err);
    output.textContent = 'Error: Could not fetch from Cohere API.';
  }
});

