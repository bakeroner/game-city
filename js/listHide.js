	const listHeadersCollection = document.querySelectorAll('.info-list');
	[].forEach.call(listHeadersCollection, function(elem) {
    elem.addEventListener('click', function(event) {
        event.currentTarget.querySelector('.info-list__list').classList.toggle('hideElement');
    })
});