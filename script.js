document.getElementById('generate').addEventListener('click', async () => {
  const transcript = document.getElementById('transcript').value.trim();
  const output = document.getElementById('output');

  if (!transcript) {
    output.textContent = 'Please enter a transcript or keywords.';
    return;
  }

  output.textContent = 'Generating cultural note...';

  const prompt = `Extract and explain cultural elements based on this video transcript:\n\n${transcript}`;

  try {
    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer jI9jy69rGL3iLZqbHMnjm6FNc9GjAZtgRVGlNeKh', // Replace this
        'Content-Type': 'application/json',
        'Cohere-Version': '2022-12-06'
      },
      body: JSON.stringify({
        model: 'command',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.8
      })
    });

    const data = await response.json();

    if (data.generations && data.generations.length > 0) {
      output.textContent = data.generations[0].text.trim();
    } else {
      output.textContent = 'No cultural note generated.';
    }
  } catch (error) {
    console.error('Error:', error);
    output.textContent = 'Error generating cultural note.';
  }
});
