const modal = document.querySelector('#feedback')
const paper = document.querySelector('#paper')
const stars = [1, 2, 3, 4, 5].map((n) => document.querySelector('#star' + n))
let rate = 0 // committed rating (0 = none)

const paint = (n) =>
    stars.forEach((s, i) => {
        if (s) s.className = 'fa fa-star' + (i < n ? ' checked' : '')
    })

function submit() {
    const Feedback = document.querySelector('#Feedback')
    const feedbackValue = Feedback ? Feedback.value : ''
    if (rate == 1 && feedbackValue != '') {
        alert(`Thank you for your rating (${rate} star) and your feedback, we really appreciate it!`)
    }
    else if (rate > 1 && feedbackValue != '') {
        alert(`Thank you for your rating (${rate} stars) and your feedback, we really appreciate it!`)
    }
    else if (rate == 1 && feedbackValue == '') {
        alert(`Thank you for your rating (${rate} star), we really appreciate it!`)
    }
    else if (rate > 1 && feedbackValue == '') {
        alert(`Thank you for your rating (${rate} stars), we really appreciate it!`)
    }
    else if (rate == 0 && feedbackValue != '') {
        alert(`Thank you for your feedback, we really appreciate it!`)
    }
    else if (rate == 0 && feedbackValue == '') {
        alert(`To submit, you will need to either give a rating or a feedback.\rBest if both 😃.`)
    }
    // Capture the submitted values before resetting so the opened URL carries them.
    const capturedRate = rate
    const capturedFeedback = feedbackValue
    window.open(`feedback.html?rating=${capturedRate}&feedback=${encodeURIComponent(capturedFeedback)}`)
    rate = 0
    paint(0)
    if (Feedback) Feedback.value = ''
    if (modal) modal.style.display = 'none'
}

if (modal && paper) {
    stars.forEach((star, index) => {
        if (!star) return
        star.addEventListener('mouseover', () => paint(index + 1))
        star.addEventListener('mouseout', () => paint(rate))
        star.addEventListener('click', () => {
            rate = index + 1
            paint(rate)
        })
    })

    paper.addEventListener('click', () => {
        modal.style.display = 'block'
    })

    const close = document.querySelector('.close')
    if (close) {
        close.addEventListener('click', () => {
            modal.style.display = 'none'
        })
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none'
    })

    document.querySelector('#feedback-submit')?.addEventListener('click', submit)
}
