let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let total = document.getElementById('total');
let btn = document.getElementById('sumbit');
let tbody = document.getElementById('tbody');
let btnd = document.getElementById('deletall');
let search = document.getElementById('search');

let moodbutton = 'create';
let moodsreach = 'title';
let tmp;

// 1. حساب الإجمالي (Total)
function caltotal(){
    if (price.value != '') {
        let total_price = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = total_price;
        total.style.background = '#040';
    } else {
        total.style.background = '#a00d02';
        total.innerHTML = '';
    }
}

// 2. جلب البيانات من التخزين المحلي (LocalStorage)
let datapro = localStorage.product ? JSON.parse(localStorage.product) : [];

// 3. دالة بناء صف الجدول (The Helper Function)
function getRowHtml(i) {
    return `
    <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick="btn_update(${i})">update</button></td>
        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
    </tr>`;
}

// 4. زر الحفظ أو التعديل
btn.onclick = function(){
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        ads: ads.value,
        taxes: taxes.value, 
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' && price.value !="" && ads.value !='' && taxes.value !='' && count.value <100){
        if (title.value != '' && price.value != '' && category.value != '') {
        if(moodbutton === 'create'){
            if (newpro.count > 1){
                for(let i = 0 ; i < newpro.count ; i++){
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
        } else {
            datapro[tmp] = newpro;
            moodbutton = 'create';
            count.style.display = 'block';
            btn.innerHTML = 'Create';
            
        }
       
    }

    localStorage.setItem('product', JSON.stringify(datapro));
    showdata();
}else{
    cleardata();
}
    }
    

// 5. مسح المدخلات (Clear Inputs)
function cleardata(){
    title.value = ''; ads.value = ''; taxes.value = '';
    price.value = ''; discount.value = ''; count.value = '';
    category.value = ''; total.innerHTML = '';
    total.style.background = '#a00d02';
}

// 6. عرض البيانات (Read)
function showdata(){
    let table = '';
    for (let i = 0; i < datapro.length; i++){
        table += getRowHtml(i); // هنا استخدمنا الدالة المختصرة
    }
    tbody.innerHTML = table;
    
    // زر حذف الكل
    if (datapro.length > 0){
        btnd.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length})</button>`;
    } else {
        btnd.innerHTML = '';
    }
}

// 7. حذف عنصر واحد
function deletedata(i){
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}

// 8. حذف الكل
function deleteAll(){
    localStorage.clear();
    datapro = [];
    showdata();
}

// 9. التحضير للتعديل (Update Mode)
function btn_update(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    caltotal();
    
    count.style.display = 'none';
    btn.innerHTML = 'Update';
    moodbutton = 'update';
    tmp = i;
    window.scroll({ top: 0, behavior: 'smooth' });
}

// 10. البحث (Search Logic)
function getSearchMood(id) {
    if (id == 'searchTitle') {
        moodsreach = 'title';
    } else {
        moodsreach = 'category';
    }
    search.placeholder = 'Search By ' + moodsreach;
    search.focus();
    search.value = '';
    showdata();
}

function searchdata(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (moodsreach === 'title') {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += getRowHtml(i);
            }
        } else {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += getRowHtml(i);
            }
        }
    tbody.innerHTML = table;
}
}

// تشغيل العرض عند فتح الصفحة
showdata();

//this project crete by youk wild wafa  