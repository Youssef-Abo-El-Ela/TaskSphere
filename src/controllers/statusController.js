// Request tracking variables
let totalRequests = 0;
let totalResponseTime = 0;

// Middleware to track requests and response times
function trackRequest(req, res, next) {
    const startTime = Date.now();

    res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        totalRequests++;
        totalResponseTime += responseTime;
    });

    next();
}

function systemStatus(req, res) {
    res.render('statusPage', {
        uptime: process.uptime().toFixed(2),
        averageResponseTime: calculateAverageResponseTime(),
        totalRequests: getTotalRequests(),
    })
}

function calculateAverageResponseTime() {
    if (totalRequests === 0) {
        return 0;
    }
    return (totalResponseTime / totalRequests).toFixed(2);
}

function getTotalRequests() {
    return totalRequests;
}

module.exports = {
    systemStatus,
    trackRequest
}