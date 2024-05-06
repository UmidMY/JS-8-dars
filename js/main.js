let user = [
    {
        id: "0001",
        login: "MDK91",
        password: "123456",
        userName: "John Doe"
    }
];
let payArry = [];

$("#editbtn").click(function(){
    let id = $(this).attr("id");
    payArry.forEach(function (item,i){
        if(id == item.id){
            payArry[i].payUser =$("payEditUser").val();
            payArry[i].payUserId =$("payEditUserId").val();
            payArry[i].payrOder =$("payEditOrder").val();
            payArry[i].paySum =$("payEditSum").val();
            payArry[i].payTarget =$("payEditTarget").val();
            payArry[i].payType =$("payEditType").val();
            payArry[i].payDate =$("payEditDate").val();
        }
    })
    $("#editModal").modal("hide");
    draw();
})

function edit(id){
    payArry.forEach(function(item){
        if(id == item.id){
            $("#payEditUser").val(item.payUser);
            $("#payEditUserId").val(item.payUserId);
            $("#payEditOrder").val(item.payOrder);
            $("#payEditSum").val(item.paySum);
            $("#payEditTarget").val(item.payTarget);
            $("#payEditType").val(item.payType);
            $("#payEditDate").val(item.payDate);
            $("#editbtn").attr("id",item.id);
        }    
    })
}

function remove (id){
        payArry.forEach(function(a,b){
            if(id == a.id){
                payArry.splice(b,1);
            }
        });
        draw();
    }
function draw(){
        let list = '';
        payArry.forEach(function(item){
            list += '<tr>' +
                        '<td>'+ item.id +'</td>' +
                        '<td>'+ item.payUser +'</td>' +
                        '<td>'+ item.paySum +'</td>' +
                        '<td>'+ item.payOrder +'</td>' +
                        '<td><span class="badge badge-success">'+ item.payTarget +'</span></td>' +
                        '<td>'+ item.payDate +'</td>' +
                        '<td>' +
                            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" onclick="edit('+ item.id +')">Edit</button>' +
                            '<button type="button" class="btn btn-danger" onclick="remove('+ item.id +')">Remove</button>' +
                        '</td>' +
                    '</tr>'
        })
        $("#tbody").html(list);
}

$(document).ready(function(){
    let kirishSoni = 0;
    let payId = 0;
    let kassirId = '';
    $("#startModal").modal("show");
    $("#startBtn").click(function(){
        let login = $("#login").val();
        let password = $("#password").val();
        if(login !="" && password !=""){
            let result = false;
            user.forEach(function(item){
                if(login == item.login){
                    result = true;
                    if(password == item.password){
                        $("#workingBlock").toggleClass("d-none");
                        $("#startModal").modal("hide");
                        $("#kassir").html(item.userName);
                        result = true;
                        kassirId = item.id;
                    }
                }
            });
            if(!result){
                if(kirishSoni >= 2){
                    $("#startModal").modal("hide");
                    alert("Tizim blocklandi");    
                }
                alert("login yoki parol xato!");
                kirishSoni++;
            }
        }else{
            alert("Login va parol qatorlarini to'ldiring!");
        }
    })
    $("#addPay").click(function(){
        let payUser = $("#payUser").val();
        let payUserId = $("#payUserId").val();
        let payOrder = $("#payOrder").val();
        let paySum = $("#paySum").val();
        let payType = $("#payType").val();
        let payTarget = $("#payTarget").val();
        let payDate = $("#payDate").val();
        payId++;
        payArry.push(
            {
                id: payId,
                userId: kassirId,
                payUser :payUser,
                payUserId:payUserId,
                payOrder: payOrder,
                paySum: paySum,
                payType: payType,
                payTarget: payTarget,
                payDate:payDate
            }
        );
       draw();
    });
});