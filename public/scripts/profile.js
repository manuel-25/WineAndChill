const URL_PROFILE = '/profile'

//Panel selection
const listItems = document.querySelectorAll('ul.profile-list li')
listItems.forEach((item) => {
    item.addEventListener('click', function(event) {
        event.preventDefault()

        const profileToShow = this.getAttribute('data-profile')

        const allProfileDetails = document.querySelectorAll('.account-details, .admin-panel, .upload-documents');
        allProfileDetails.forEach(function(element) {
            if (element.classList.contains(profileToShow)) {
                element.classList.remove('hide')
            } else {
                element.classList.add('hide')
            }
        })
        
        const allProfileLists = document.querySelectorAll('.profile-list li')
        allProfileLists.forEach(function (element) {
            element.classList.remove('selected')
            if(element.getAttribute('data-profile') === profileToShow) {
                element.classList.add('selected')
            }
        })
    })
})

//Upload profile photo
const photoUploadInput = document.getElementById('photo')

photoUploadInput.addEventListener('change', (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const formData = new FormData();
        formData.append('photo', selectedFile)

        fetch('/api/users/update/photo', {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: data.response,
                    confirmButtonText: 'OK',
                    timerProgressBar: true,
                }).then(() => {
                    window.location.reload()
                })
            } else {
                const displayError = data.message ?? data.error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: displayError,
                    confirmButtonText: 'OK'
                })
            }
        })
    }
})

//Toggle detail lists
const arrowIcon = document.querySelector('.arrow-icon')
const userCard = document.querySelectorAll('.user-card')
arrowIcon.addEventListener('click', () => {
    userCard.forEach(card => {
        card.classList.toggle('hide')
    })
    arrowIcon.classList.toggle('rotate')
})
 

//Edit user role
const editIcons = document.querySelectorAll('.edit-icon')
editIcons.forEach((editIcon) => {
    editIcon.addEventListener('click', () => {
        const userCard = editIcon.closest('.user-card')
        const userId = userCard.getAttribute('data-uid')
        const selectRole = userCard.querySelector('select').value
        const roleData = { role: selectRole }

        fetch(`/api/users/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(roleData)
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                Swal.fire({
                    icon: 'error',
                    title: 'Try Again',
                    text: data.message || 'Error updating',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    text: data.message,
                })
            }
        })
        .catch((error) => {
            console.error('Error de red al actualizar el rol del usuario', error)
        })
    })
})

//Delete user
const deleteIcons = document.querySelectorAll('.delete-icon')
deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
        const userId = deleteIcon.getAttribute('data-user-id')
        fetch(`/api/users/delete/${userId}`, {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                Swal.fire({
                    icon: 'error',
                    title: 'Try Again',
                    text: data.message || 'Error deleting',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    text: data.message,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = URL_PROFILE + '?panel=admin-panel'
                    }
                })
            }
        })
        .catch((error) => {
            console.error('Error de red al eliminar el usuario', error)
        })
    })
})

//Edit account details
const editButton = document.getElementById('editButton')
editButton.addEventListener('click', (event) => {
    const email= document.getElementById('email').value
    const name = document.getElementById('name').value
    const age = document.getElementById('age').value
    const address = document.getElementById('address').value
    const phone = document.getElementById('phone').value

    fetch('/api/users/update/profile',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name, age, address, phone})
    })
    .then(res => res.json())
    .then(data => {
        if (!data.success) {
            Swal.fire({
                icon: 'error',
                title: 'Try Again',
                text: data.message || 'Error updating',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Updated',
                text: data.message,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location.href = URL_PROFILE
                }
            })
        }
    })
})

//Upload documents
const uploadForm = document.getElementById('uploadForm')

uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const documentsFile = document.getElementById('documents').files[0]
    const userId = uploadForm.getAttribute('data-user-id')

    const formData = new FormData()
    formData.append('documents', documentsFile)

    try {
        fetch(`/api/users/${userId}/documents`, {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                Swal.fire({
                    icon: 'error',
                    title: 'Try Again',
                    text: data.message || 'Error uploading',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated',
                    text: data.message,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = URL_PROFILE + '?panel=upload-documents'
                    }
                })
            }
        })

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Try Again',
            text: err || 'Error uploading',
            confirmButtonText: 'OK'
        })
    }
})