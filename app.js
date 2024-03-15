
function slideUp(sectionId, className) {
    
    var container = document.querySelector('.main-container');
    var sections = document.querySelectorAll("."+className);
    var activeSection = document.getElementById(sectionId);

    // First, hide all sections
    sections.forEach(function(section) {
        section.classList.remove(className+'-visible');
        if (section.id !== sectionId) {
            section.style.display = 'none';  // Ensures other sections don't take up space
        }
    });

    // Delay the display change to allow for opacity transition
    setTimeout(function() {
        activeSection.style.display = 'block';  // Only display the active section
        setTimeout(() => {
            activeSection.classList.add(className+'-visible');  // Then fade it in
        }, 20); // A small delay to ensure the class addition triggers the transition
    }, 500); // This should be the length of your slide-up transition

    // Slide up the container
    container.classList.add('slide-up');
    document.querySelector('.back-button').classList.add('back-button-visible');
}

function slideDown() {
    var container = document.querySelector('.main-container');
    var activeSection = document.querySelector('.overlay-text-visible') || document.querySelector('.method-text-visible');

    // If there's an active section, proceed to hide it
    if (activeSection) {
        activeSection.style.transition = 'opacity 0.2s ease, visibility 0.2s ease';
        activeSection.classList.remove('overlay-text-visible');
        activeSection.classList.remove('method-text-visible'); // If using a different class for methods

        // Remove the slide-up class to slide down the container
        container.classList.remove('slide-up');
        document.querySelector('.back-button').classList.remove('back-button-visible');

        // Reset the transition duration back to normal after the transition ends
        setTimeout(function() {
            activeSection.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
            activeSection.style.display = 'none'; // Hide the section after the transition
        }, 200);
    }
}

function switchSection(sectionId, className) {
    // Hide all sections first
    var sections = document.querySelectorAll('.overlay-text, .method-text');
    sections.forEach(function(section) {
        section.classList.remove('overlay-text-visible', 'method-text-visible');
        section.style.display = 'none';  // Ensures other sections don't take up space
    });

    // Show the desired section
    var activeSection = document.getElementById(sectionId);
    activeSection.style.display = 'block';  // Only display the active section
    setTimeout(() => {
        activeSection.classList.add(className+'-visible');  // Then fade it in
    }, 20); // A small delay to ensure the class addition triggers the transition
}

// const csvData = `Indication (AUPRC),C-Indication (AUPRC),Label
// 0.883,0.8,VGAE
// 0.87,0.796, Baseline
// 0.743,0.641,15,000 Psuedo Edges  
// 0.733,0.639,75,000 Psuedo Edges
// `;

// function createBarChart(csvData) {
//     // Parse the CSV data
//     const dataLines = csvData.split('\n').slice(1); // Skip the header line
//     const labels = [];
//     const indicationData = [];
//     const cIndicationData = [];

//     dataLines.forEach(line => {
//         const [indication, cIndication, label] = line.split(',');
//         labels.push(label);
//         indicationData.push(parseFloat(indication));
//         cIndicationData.push(parseFloat(cIndication));
//     });

//     // Get the context of the canvas element
//     const ctx = document.getElementById('resultsChart').getContext('2d');

//     // Create the bar chart
//     const resultsChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: 'Indication (AUPRC)',
//                     data: indicationData,
//                     backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                     borderColor: 'rgba(255, 99, 132, 1)',
//                     borderWidth: 1
//                 },
//                 {
//                     label: 'C-Indication (AUPRC)',
//                     data: cIndicationData,
//                     backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                     borderWidth: 1
//                 }
//             ]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             },
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//                 legend: {
//                     position: 'top',
//                 },
//                 title: {
//                     display: true,
//                     text: 'Chart.js Bar Chart'
//                 }
//             }
//         }
//     });
// }

document.addEventListener('DOMContentLoaded', function() {
    var trace1 = {
        x: ['Baseline', 'Basic KD', 'LSP (1 Layer)', 'LSP (2 Layers)', 'FlyKD'],
        y: [77.13, 77.13-0.622, 77.13-1.09, 77.13-1.41, 77.13+1.156],
        name: 'SF Zoo',
        type: 'bar'
    };

    var data = [trace1];
    var layout = {
        width: 70, // or any other size
        height: 40, // or any other size
        barmode: 'group',
        plot_bgcolor: 'rgba(0,0,0,0)', 
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            color: 'black', // Ensures x-axis lines and ticks are black
        },
        yaxis: {
            color: 'black', // Ensures y-axis lines and ticks are black
            gridcolor: 'black', // Ensures y-axis grid lines are black
        } 
      };
    Plotly.newPlot('myDiv', data, layout);

    var trace2 = {
        x: ['Baseline', 'Basic KD (Curriculum)', 'FlyKD (Fixed random graph)', 'FlyKD (no curriculum)', 'FlyKD (no pseudo labels on training)'],
        y: [77.13, 77.13+0.926, 77.13+1.136, 77.13+0.186, 77.13- 0.678],
        name: 'SF Zoo',
        type: 'bar'
    };

    var data2 = [trace2];
    var layout2 = {
        barmode: 'group',
        plot_bgcolor: 'rgba(0,0,0,0)', 
        paper_bgcolor: 'rgba(0,0,0,0)',
        xaxis: {
            color: 'black',
            tickfont: {
                size: 7,
            } 
        },
        yaxis: {
            color: 'black', 
            gridcolor: 'black', 
        } 
        
      };
      Plotly.newPlot('myDiv2', data2, layout2);
});

// Call the function to create the chart after the page has loaded
window.onload = function() {
    createBarChart(csvData);
};
