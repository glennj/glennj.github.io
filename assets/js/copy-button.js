// https://www.tutorialpedia.org/blog/easy-way-to-add-copy-to-clipboard-to-github-markdown/ 

// Wait for the page to fully load  
document.addEventListener('DOMContentLoaded', function() {  
  // Target only terminal command code blocks (bash/shell)  
  // Adjust selectors to match your language tags (e.g., "language-bash", "language-shell")  
  // const codeBlocks = document.querySelectorAll('pre > code.language-bash, pre > code.language-shell');  
  // glennj: all codeblocks
  const codeBlocks = document.querySelectorAll('pre.highlight > code');  
 
  codeBlocks.forEach(block => {  
    // Get the parent <pre> element (contains the code block)  
    const preElement = block.parentElement;  
 
    // Wrap the <pre> in a container div  
    const container = document.createElement('div');  
    container.classList.add('code-block-container');  
    preElement.parentNode.insertBefore(container, preElement);  
    container.appendChild(preElement);  
 
    // Create the "Copy" button  
    const copyButton = document.createElement('button');  
    copyButton.classList.add('copy-button');  
    copyButton.textContent = 'Copy';  
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');  
 
    // Create the "Copied!" success message  
    const successMessage = document.createElement('span');  
    successMessage.classList.add('success-message');  
    successMessage.textContent = 'Copied!';  
 
    // Add button and message to the container  
    container.appendChild(copyButton);  
    container.appendChild(successMessage);  
 
    // Add click event to copy text  
    copyButton.addEventListener('click', () => {  
      // Extract text from the code block  
      const codeText = block.textContent;  
 
      // Copy to clipboard using the Clipboard API  
      navigator.clipboard.writeText(codeText).then(() => {  
        // Show "Copied!" message and hide the button temporarily  
        copyButton.style.display = 'none';  
        successMessage.style.display = 'inline';  
 
        // Reset after 2 seconds  
        setTimeout(() => {  
          successMessage.style.display = 'none';  
          copyButton.style.display = 'inline';  
        }, 2000);  
      }).catch(err => {  
        // Fallback for older browsers or permission issues  
        console.error('Failed to copy text: ', err);  
        alert('Failed to copy. Please select and copy manually.');  
      });  
    });  
  });  
});  
