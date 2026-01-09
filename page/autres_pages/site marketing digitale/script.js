document.addEventListener('DOMContentLoaded', function() {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('animate');
}
});
}, { threshold: 0.5 });
document.querySelectorAll('.chat-message').forEach(message => {
observer.observe(message);
});
});

document.addEventListener('DOMContentLoaded', function() {
const stats = document.querySelectorAll('.stat-number');
function animateNumber(element, target) {
let current = 0;
const increment = target / 50;
const duration = 2000;
const interval = duration / 50;
const timer = setInterval(() => {
current += increment;
if (current >= target) {
current = target;
clearInterval(timer);
}
element.textContent = Math.round(current);
}, interval);
}
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const target = parseInt(entry.target.dataset.target);
animateNumber(entry.target, target);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.5 });
stats.forEach(stat => observer.observe(stat));
});


document.addEventListener('DOMContentLoaded', function() {
const stats = document.querySelectorAll('.stat-number');
function animateNumber(element, target) {
let current = 0;
const increment = target / 50;
const duration = 2000;
const interval = duration / 50;
const timer = setInterval(() => {
current += increment;
if (current >= target) {
current = target;
clearInterval(timer);
}
element.textContent = Math.round(current);
}, interval);
}
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const target = parseInt(entry.target.dataset.target);
animateNumber(entry.target, target);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.5 });
stats.forEach(stat => observer.observe(stat));
});



document.addEventListener('DOMContentLoaded', function() {
const stats = document.querySelectorAll('.stat-number');
function animateNumber(element, target) {
let current = 0;
const increment = target / 50;
const duration = 2000;
const interval = duration / 50;
const timer = setInterval(() => {
current += increment;
if (current >= target) {
current = target;
clearInterval(timer);
}
element.textContent = Math.round(current);
}, interval);
}
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const target = parseInt(entry.target.dataset.target);
animateNumber(entry.target, target);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.5 });
stats.forEach(stat => observer.observe(stat));
});



document.addEventListener('DOMContentLoaded', function() {
const stats = document.querySelectorAll('.stat-number');
function animateNumber(element, target) {
let current = 0;
const increment = target / 50;
const duration = 2000;
const interval = duration / 50;
const timer = setInterval(() => {
current += increment;
if (current >= target) {
current = target;
clearInterval(timer);
}
element.textContent = Math.round(current);
}, interval);
}
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const target = parseInt(entry.target.dataset.target);
animateNumber(entry.target, target);
observer.unobserve(entry.target);
}
});
}, { threshold: 0.5 });
stats.forEach(stat => observer.observe(stat));
});




document.addEventListener('DOMContentLoaded', function() {
const chartContainer = document.getElementById('analytics-chart');
if (chartContainer) {
const chart = echarts.init(chartContainer);
const option = {
animation: false,
tooltip: {
trigger: 'axis',
backgroundColor: 'rgba(255, 255, 255, 0.8)',
textStyle: {
color: '#1f2937'
}
},
grid: {
top: 10,
right: 10,
bottom: 20,
left: 40
},
xAxis: {
type: 'category',
data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
axisLine: {
lineStyle: {
color: '#4b5563'
}
},
axisLabel: {
color: '#9ca3af'
}
},
yAxis: {
type: 'value',
axisLine: {
lineStyle: {
color: '#4b5563'
}
},
splitLine: {
lineStyle: {
color: '#374151'
}
},
axisLabel: {
color: '#9ca3af'
}
},
series: [
{
name: 'Engagement',
type: 'line',
smooth: true,
data: [120, 132, 101, 134, 90, 180],
lineStyle: {
color: 'rgba(87, 181, 231, 1)'
},
itemStyle: {
color: 'rgba(87, 181, 231, 1)'
},
showSymbol: false,
areaStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{
offset: 0,
color: 'rgba(87, 181, 231, 0.3)'
},
{
offset: 1,
color: 'rgba(87, 181, 231, 0.1)'
}
])
}
},
{
name: 'Conversions',
type: 'line',
smooth: true,
data: [220, 182, 191, 234, 290, 330],
lineStyle: {
color: 'rgba(141, 211, 199, 1)'
},
itemStyle: {
color: 'rgba(141, 211, 199, 1)'
},
showSymbol: false,
areaStyle: {
color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
{
offset: 0,
color: 'rgba(141, 211, 199, 0.3)'
},
{
offset: 1,
color: 'rgba(141, 211, 199, 0.1)'
}
])
}
}
]
};
chart.setOption(option);
window.addEventListener('resize', function() {
chart.resize();
});
}
});



document.addEventListener('DOMContentLoaded', function() {
const faqButtons = document.querySelectorAll('.faq-button');
faqButtons.forEach(button => {
button.addEventListener('click', function() {
const content = this.nextElementSibling;
const icon = this.querySelector('.faq-icon');
if (content.classList.contains('hidden')) {
content.classList.remove('hidden');
icon.classList.remove('ri-add-line');
icon.classList.add('ri-subtract-line');
} else {
content.classList.add('hidden');
icon.classList.remove('ri-subtract-line');
icon.classList.add('ri-add-line');
}
});
});
});


document.addEventListener('DOMContentLoaded', function() {
const monthlyBtn = document.getElementById('monthly-btn');
const annualBtn = document.getElementById('annual-btn');
if (monthlyBtn && annualBtn) {
monthlyBtn.addEventListener('click', function() {
monthlyBtn.classList.add('bg-primary', 'text-white');
monthlyBtn.classList.remove('text-gray-300');
annualBtn.classList.remove('bg-primary', 'text-white');
annualBtn.classList.add('text-gray-300');
});
annualBtn.addEventListener('click', function() {
annualBtn.classList.add('bg-primary', 'text-white');
annualBtn.classList.remove('text-gray-300');
monthlyBtn.classList.remove('bg-primary', 'text-white');
monthlyBtn.classList.add('text-gray-300');
});
}
});


document.addEventListener('DOMContentLoaded', function() {
const chatbotButton = document.getElementById('chatbot-button');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendMessage = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');
function addMessage(message, isUser = false) {
const messageDiv = document.createElement('div');
messageDiv.className = isUser ? 'chat-message-user flex items-start justify-end' : 'chat-message-bot flex items-start';
const messageContent = `
${isUser ? '' : `
<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
<i class="ri-customer-service-2-line text-primary"></i>
</div>
`}
<div class="bg-${isUser ? 'primary' : 'gray-800'} rounded-lg ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} p-3 max-w-[80%]">
<p class="text-sm">${message}</p>
</div>
`;
messageDiv.innerHTML = messageContent;
chatMessages.appendChild(messageDiv);
chatMessages.scrollTop = chatMessages.scrollHeight;
}
chatbotButton.addEventListener('click', function() {
chatWindow.classList.remove('hidden');
chatbotButton.classList.add('hidden');
if (!chatWindow.classList.contains('hidden')) {
chatInput.focus();
}
});
closeChat.addEventListener('click', function() {
chatWindow.classList.add('hidden');
chatbotButton.classList.remove('hidden');
});
function handleSendMessage() {
const message = chatInput.value.trim();
if (message) {
addMessage(message, true);
chatInput.value = '';
// Simulate bot response
setTimeout(() => {
addMessage("Thanks for your message! Our team will get back to you soon.");
}, 1000);
}
}
sendMessage.addEventListener('click', handleSendMessage);
chatInput.addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
handleSendMessage();
}
});
});




!function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.crossOrigin = "anonymous", p.async = !0, p.src = s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);
    posthog.init('phc_t9tkQZJiyi2ps9zUYm8TDsL6qXo4YmZx0Ot5rBlAlEd', {
        api_host: 'https://us.i.posthog.com',
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        capture_performance: {
            web_vitals: false,
        },
        rageclick: false,
    })
    window.shareKey = 'rXzx0c7TYjs-jVHqnaH1Rw';
    window.host = 'readdy.ai';