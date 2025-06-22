document.addEventListener('DOMContentLoaded', () => {
  // Quick Prompt Click
  document.querySelectorAll('.quick-prompt').forEach(el => {
    el.addEventListener('click', () => {
      const prompt = el.dataset.prompt;
      document.getElementById('customPrompt').value = prompt;
      const textarea = document.getElementById('customPrompt');
      textarea.style.background = 'linear-gradient(135deg, #e6fffa, #f0fff4)';
      setTimeout(() => {
        textarea.style.background = 'white';
      }, 1000);
    });
  });

  // Button Click
  document.getElementById('generateBtn').addEventListener('click', generateRecommendation);

  // Enter Key Shortcut
  document.getElementById('customPrompt').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.ctrlKey) {
      generateRecommendation();
    }
  });
});

async function generateRecommendation() {
  const budget = document.getElementById('budget').value;
  const useCase = document.getElementById('useCase').value;
  const customPrompt = document.getElementById('customPrompt').value;

  if (!budget && !useCase && !customPrompt) {
    showNotification('Please provide at least one requirement (budget, use case, or custom description)', 'error');
    return;
  }

  const generateBtn = document.getElementById('generateBtn');
  const loading = document.getElementById('loading');
  const responseDiv = document.getElementById('response');

  generateBtn.disabled = true;
  loading.style.display = 'block';
  responseDiv.innerHTML = '🔄 Processing your requirements...';
  responseDiv.className = 'response';

  const requestData = { budget, useCase, customPrompt };

  try {
    const response = await fetch('/api/generate-pc-build', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    if (data.success) {
      responseDiv.innerHTML = data.recommendation;
      responseDiv.classList.add('success');
      showNotification('✅ PC build generated successfully!', 'success');
    } else {
      throw new Error(data.error || 'Failed to generate recommendation');
    }
  } catch (error) {
    console.error('Error:', error);
    responseDiv.innerHTML = generateMockResponse(budget, useCase, customPrompt);
    responseDiv.classList.add('error');
    showNotification('⚠️ Demo mode: Showing sample recommendation. Backend needed for live AI generation.', 'error');
  } finally {
    generateBtn.disabled = false;
    loading.style.display = 'none';
  }
}

function generateMockResponse(budget, useCase, customPrompt) {
  return `
    🎯 **AI PC BUILD RECOMMENDATION**

    **Build Overview:** Based on your requirements (${budget || 'Flexible budget'}, ${useCase || 'General use'}), here's your optimized PC build:

    💻 CPU: AMD Ryzen 5 7600X  
    GPU: NVIDIA RTX 4060 Ti 16GB  
    ... (rest of mock recommendation) ...
  `;
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 15px;
    border-radius: 8px;
    color: white;
    z-index: 1000;
  `;
  notification.style.background = (type === 'success')
    ? 'linear-gradient(135deg, #48bb78, #38a169)'
    : 'linear-gradient(135deg, #f56565, #e53e3e)';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}
