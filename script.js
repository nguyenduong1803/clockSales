const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function Validator() {
    const tour = $('#tour')
    const tourID = $('#tourID')
    const donvi = $('#donvi')
    const quantity = $('#quantity')
    const price = $('#price')
    const man = $('#man')
    const feman = $('#feman')
    const form = $('#form')
    const errMess = $$('.errMess')
    const arrTour = []
    form.onsubmit = function(e) {
        const obj = {}

        if (!tour.value) {
            message(tour, 'Vui lòng nhập dữ liệu')
        } else if (tour.value.length < 10) {
            message(tour, 'Vui lòng nhập tên tour lớn hơn 10 kí tự')

        } else {
            message(tour, '')
            obj.tour = tour.value
        }

        if (!tourID.value) {
            message(tourID, 'Vui lòng nhập dữ liệu')
        } else if (tourID.value.length < 5) {
            message(tourID, 'Vui lòng nhập mã tour lớn hơn 5 kí tự')

        } else {
            message(tourID, '')
            obj.tourID = tourID.value
        }

        if (!donvi.value) {
            message(donvi, 'Vui lòng nhập dữ liệu')
        } else {
            message(donvi, '')
            obj.donvi = donvi.value
        }

        if (!quantity.value) {
            message(quantity, 'Vui lòng nhập dữ liệu')
        } else if (!checkNum(quantity.value)) {
            message(quantity, 'Vui lòng nhập số người đi cùng là số dương')

        } else {
            message(quantity, '')
            obj.quantity = quantity.value
        }

        if (!price.value) {
            message(price, 'Vui lòng nhập dữ liệu')
        } else if (!checkNum(price.value)) {
            message(price, 'Vui lòng nhập giá tiền là số dương')

        } else {
            message(price, '')
            obj.price = price.value
        }
        if (man.checked || feman.checked) {
            man.parentElement.querySelector('.errMess').innerHTML = ''
            if (man.checked) {
                obj.gender = man.value
            } else {
                obj.gender = feman.value
            }
        } else {
            man.parentElement.querySelector('.errMess').innerHTML = 'Vui lòng nhập dữ liệu'
        }

        const result = Array.from(errMess).every((err => {
            return err.innerHTML === ""
        }))
        if (result) {
            console.log('thành công');
            arrTour.push(obj)
            const html = arrTour.map((tour) => {
                const tong = tour.price * tour.quantity
                return `
                <tr>
                <td>${tour.tour}</td>
                <td>${tour.tourID}</td>
                <td>${tour.donvi}</td>
                <td>${tour.gender}</td>
                <td>${tour.quantity}</td>
                <td>${tour.price}</td>  
                <td>${tong}</td>  
                 </tr>
                `
            })

            $('.render').innerHTML = html.join('')

            $('.sussec').classList.add('active')
            setTimeout(() => {
                $('.sussec').classList.remove('active')
            }, 600)

            const tong = arrTour.reduce((tong, t) => {
                tong += t.price * t.quantity
                return tong
            }, 0);
            console.log(tong);

        } else {
            e.preventDefault();
            console.log('Thất bại');
        }

        function message(input, mess) {
            input.parentElement.querySelector('.errMess').innerHTML = mess
        }

        function checkNum(input) {
            return input > 0 ? true : false
        }
    }
}
console.log("sửa đổi nội dung");
Validator();