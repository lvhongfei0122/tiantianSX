var reg = {
			usernameReg:/^(([\u4e00-\u9fa5])|[0-9a-zA-Z-_]){4,15}$/,
			pwdReg:/^.{6,16}$/,
			emailReg:/^[0-9a-zA-Z]+([-_.][0-9a-zA-Z]+)*@([0-9a-zA-Z]+[-.])+[a-zA-Z]{2,4}$/,
			mobileReg:/1[3|5|7|8|9][0-9]\d{8}$/, ///1[3|5|7|8|9]\d{9}$/
			numReg:/\d/,//全是数字，弱
			strReg:/[a-zA-Z]/,//全是字母，中
			tsReg:/[^\u4e00-\u9fa5a-zA-Z0-9]/ //除汉字,数字，字母的其他符号组成，强
		}
//box->常规: box ;错误:box error(红边框);正确:box right(对号);

//tip->常规:tip hide; 错误:tip error(红图标);正确:tip default(灰图标);
//获取id函数
function $(id){
	return document.getElementById(id);
}

var userName = $('userName');
var pwd = $('pwd');
var pwd2 = $('pwd2');
var email = $('email');
var mobile = $('mobile');
var ck = $('ck');
var btn = $('btn');

//1---用户名
userName.onfocus = userName.onblur=userName.onkeyup = function(ev){
	//判断执行的事件，事件不同执行动作不同
	var Event = ev||window.event;
	checkUserName(Event);//调用函数
}
function checkUserName(Event){
	var type;//事件的类型
	if(Event){
		type = Event.type;
	}
	var value = userName.value;
	var box = userName.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	//用户没输入内容
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '支持汉字，字母，数字，-，_ 的组合，4-15位';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
	
//用户要输入内容
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='用户名不能为空哦！';
		return false;
	}else if(reg.usernameReg.test(value)){
		box.className='box right';
		tip.className='tip hide';
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='用户名格式错误，仅支持汉字，字母，数字，-，_ 的组合，4-15位';
		return false;
	}
}
//2---密码
pwd.onfocus = pwd.onblur=pwd.onkeyup = function(ev){
	//判断执行的事件，事件不同执行动作不同
	var Event = ev||window.event;
	checkPwd(Event);//调用函数
}
function checkPwd(Event){
	var type;//事件的类型
	if(Event){
		type = Event.type;
	}
	var value = pwd.value;
	var box = pwd.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	//用户没输入内容
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '建议使用数字，字母的结合，6-16位';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
//用户要输入内容
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='密码不能为空哦！';
		return false;
	}else if(reg.pwdReg.test(value)){
		box.className='box right';
		//---判断密码等级
		var level = getPwdLevel(value);
		switch(level){
			case 1:
				tip.className='tip ruo';
				span.innerHTML='建议修改密码';
				break;
				case 2:
				tip.className='tip zhong';
				span.innerHTML='可以使用';
				break;
				case 3:
				tip.className='tip qiang';
				span.innerHTML='完美';
				break;
		}
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='密码格式错误，6-16位数字与字母的结合';
		return false;
	}
}

//3---确认密码
pwd2.onfocus = pwd2.onblur=pwd2.onkeyup = function(ev){
	//判断执行的事件，事件不同执行动作不同
	var Event = ev||window.event;
	checkPwd2(Event);//调用函数
}
function checkPwd2(Event){
	var type;//事件的类型
	if(Event){
		type = Event.type;
	}
	var value1= pwd.value;
	var value = pwd2.value;
	var box = pwd2.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	//用户没输入内容
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '请再次输入密码';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
//用户要输入内容
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='密码不能为空哦！';
		return false;
	}else if(value1==value){
		box.className='box right';
		tip.className="tip hide";
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='两次密码不一致请重新输入';
		return false;
	}
}
//4---邮箱验证
email.onfocus = email.onblur=email.onkeyup = function(ev){
	//判断执行的事件，事件不同执行动作不同
	var Event = ev||window.event;
	checkEmail(Event);//调用函数
}
function checkEmail(Event){
	var type;//事件的类型
	if(Event){
		type = Event.type;
	}
	var value = email.value;
	var box = email.parentNode;
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	//用户没输入内容
	if(type=='focus'){
		if(value==''){
			box.className='box';
			tip.className='tip default';
			span.innerHTML = '请输入正确的邮箱格式';
			return false;
		}
	}
	if(type=='blur'){
		if(value==''){
			box.className='box';
			tip.className='tip hide';
			return false;
		}
	}
	
//用户要输入内容
	if(value==''){
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='邮箱不能为空哦！';
		return false;
	}else if(reg.emailReg.test(value)){
		box.className='box right';
		tip.className='tip hide';
		return true;
	}else{
		box.className='box error';
		tip.className='tip error';
		span.innerHTML='邮箱格式错误';
		return false;
	}
}


//6---表单提交验证
function checkData(){
	var box = ck.parentNode
	var tip = box.parentNode.children[1];
	var span = tip.children[1];
	if(ck.checked){
		if(checkUserName()&&checkPwd()&&checkPwd2()&&checkEmail()&&checkMobile()){
			alert('信息正确，正在为您跳转。。。。。。');
			return true;
		}else{
			alert('填写格式有误，请重新输入');
			return false;
		}
	}else{
		tip.className='tip error';
		span.innerHTML='请同意协议';
		return false;
	}
	return false;//默认阻止提交
}
