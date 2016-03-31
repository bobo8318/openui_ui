/**
 * Created by Administrator on 15-7-29.
 */
;(function($,window,document,undefined){
	//form check
    var OpenForm = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            'border':'2px solid red'
        };
        this.options = $.extend({}, this.defaults, opt);
    }
    //定义方法
    OpenForm.prototype = {
        check:function() {
			var flag = true;
			//alert(this.$element.serialize());
           this.$element.find('input,select,textarea').each(function(){
                if($(this).attr('open-data') != undefined){
                   var checkRule = $(this).attr('open-data').split(",");
					for(rule in checkRule){
						if(checkRule[rule] === 'notEmpty'){//非空
							if($(this).attr('type')=='radio'){//radiobox
								var radioname = $(this).attr('name');
								if(!$(':radio[name='+radioname+']:checked').length){
									$(this).parent().css('border','2px solid red');
									//$(this).parent().after("<span name=\"open-tips\" class=\"help-inline\">不能为空</span>");
									flag = false;
									$(':radio[name='+radioname+']').change(function() { 
										$(this).parent().css('border','none');
									}); 
								}
								
									
							}
							else if($(this).val() === ''){//is empty
								$(this).focus();//focus
								
								$(this).css('border','2px solid red');//red border
								$(this).after("<span name=\"open-tips\" class=\"help-inline\">不能为空</span>");
								
								$(this).bind('input propertychange',function(){//input somthing remove alarm css
									if($(this).val() != ''){
										$(this).css('border','');
										if($(this).next().attr('name')==='open-tips')
											$(this).next().remove();
									}
								});
								
								flag = false;
							}
						}else if(!isNaN(checkRule[rule])){//长度
							if($(this).val().length>checkRule[rule]){
								$(this).focus();//focus
								$(this).css('border','2px solid red');//red border
								
								flag = false;
							}
						}else if(checkRule[rule]==="number"){//数字
						
							if(isNaN($(this).val())){
								$(this).focus();//focus
								$(this).css('border','2px solid yellow');//red border
								
								flag = false;
							}
						}
						
					}
                    
                }
            });
			return flag;
        }
       
    }
	
	
	
	
    //在插件中使用对象
    $.fn.openForm = function(options) {
        //创建实体
        var openForm = new OpenForm(this, options);
        //调用其方法
        return openForm.check();
    }
	/**
	___________tab______________
	**/
	$.fn.openTab = function(options) {
		if(options!=undefined && options.type==="verical"){
			$(".openTabTitle").css('z-index','20');
			$(".openTabTitle li").css('width','30px');
			$(".openTabTitle li").css('height','100px');
			$(".openTabTitle li").css('line-height','25px');
			$(".openTabTitle li").css('border-right','#FFF 1px solid');
			$(".openTabTitle li").css('border-bottom','#0099CC 1px solid');
			$(".openTabTitle li").css('margin-bottom','1px');
			$(".openTabTitle li").css('font-size','16px');
			

			$(".openTabContent").css('width','100px');
			$(".openTabContent").css('height',"450px");
			$(".openTabContent").css('top','0px');
			$(".openTabContent").css('left','30px');
			
			
		}else{
			$(".openTabTitle li").css('float','left');
			$(".openTabTitle").css('z-index','20');
		}
		
		
		
		$(".openTabTitle li").each(function(){
			if($(this).attr('class')=='openTabfocus')
				$('.openTabContent').find('div').eq($(this).index()).show();
		});
		
        $(".openTabTitle li").click(function(){
			$(this).addClass('openTabfocus').siblings().removeClass('openTabfocus');
			
			$('.openTabContent').children('.openTabPanel').eq($(this).index()).show().siblings('.openTabPanel').hide();
		});
    }
	/**
	——————————————checkbox all select________________
	**/
	$.fn.openSelectAll = function(checkBoxName) {
		
		this.click(function(){
			$("[name='"+checkBoxName+"']").attr("checked",'true');
		});
    }
	$.fn.openUnSelectAll = function(checkBoxName) {
		
		this.click(function(){
			$("[name='"+checkBoxName+"']").removeAttr("checked");
		});
    }
	
	$.fn.openPop = function(type,divid) {

	var windowHeight = $(window).height(); 
	var windowWidth = $(window).width(); 
	var popHeight = $(".openWindow").height(); 
	var popWidth = $(".openWindow").width(); 
 
		if(type==="center"){
			var popY = (windowHeight-popHeight)/2; 
			var popX = (windowWidth-popWidth)/2;
			$("#"+divid).css("top",popY).css("left",popX).slideToggle("slow");  
		}
    }
	/**
	————————————————pagination————————————————————————————
	**/
	$.fn.openPagination = function(options){
		
		var CURRENTPAGE = options.CURRENTPAGE;
		var totalpage = options.totalpage;
		var responsePageStart = options.responsePageStart;
		var responsePageEnd = options.responsePageEnd;
		var reqUrl = options.reqUrl;
		var PaginationHtml = "<div class='pagination'><ul>";
		
		if(CURRENTPAGE == 1){
			PaginationHtml += "<li class='disabled'><a href='#'>&laquo;</a></li>";
		}else{
			PaginationHtml += "<li><a href='"+reqUrl+(CURRENTPAGE-1)+"'>&laquo;</a></li>";
		}
		for(var i=responsePageStart;i<=responsePageEnd;i++){
			if(CURRENTPAGE==i){
				PaginationHtml += "<li class='active'><a href='#'>"+i+"</a></li>";
			}else{
				PaginationHtml += "<li><a href='"+reqUrl+i+"'>"+i+"</a></li>";
			}
		}
		if(CURRENTPAGE == totalpage || totalpage == 0){
			PaginationHtml += "<li class='disabled'><a href='#'>&raquo;</a></li>";
		}else{
			PaginationHtml += "<li><a href='"+reqUrl+(CURRENTPAGE+1)+"'>&raquo;</a></li>";
		}
		
		PaginationHtml +="</ul></div>";
		
		this.html(PaginationHtml);
	}
	/**
	————————editable table——————————————————————————
	**/
	$.fn.openEditTable = function(){
		$("tbody td.openData").click(function () {
			 //找到当前鼠标单击的td  
			var tdObj = $(this);  
			//保存原来的文本  
			var oldText = $(this).text();  
			//创建一个文本框  
			var inputObj = $("<input type='text' value='" + oldText + "'/>");  
			//去掉文本框的边框  
			inputObj.css("border-width", 0);  
			inputObj.click(function () {  
				return false;  
			});  
			//使文本框的宽度和td的宽度相同  
			var oldpadding = tdObj.css("padding");
			tdObj.css("padding", 0);
			inputObj.width(tdObj.width());  
			inputObj.height(tdObj.height());  
			//去掉文本框的外边距  
			inputObj.css("margin", 0);  
			inputObj.css("padding", 0);  
			inputObj.css("text-align", "center");  
			inputObj.css("font-size", "16px");
			//inputObj.css("background-color", tdObj.css("background-color"));
			inputObj.css("background-color", "yellow");  
			//把文本框放到td中  
			tdObj.html(inputObj);  
			//文本框失去焦点的时候变为文本  
			inputObj.blur(function () {
				tdObj.css("padding", oldpadding);
				var newText = $(this).val();  
				tdObj.html(newText); 
				//如果值有变化 改变背景颜色已提醒
				if(oldText!=newText){
					tdObj.css("background-color", "gray");
				}
			}); 
			//全选  
			inputObj.trigger("focus").trigger("select");  
		});
	}
	/**
	-------------open pic slide-------------------------------
	**/
	$.fn.openScroll = function(option){
		var containerWidth = 0;
		var containerLiWidth = 0;
		var childrenCount = 0;
		if(option.direction == 'top'){//向上
			if(option.type == 'ul'){
				containerWidth = this.height();
				containerLiWidth = this.children('ul').children('li').height();
				childrenCount = this.children('ul').children('li').length;
			}
		}else if(option.direction == 'left'){

			if(option.type == 'ul'){
				containerWidth = this.width();
				containerLiWidth = this.children('ul').children('li').width();
				childrenCount = this.children('ul').children('li').length;
			}
			else if(option.type == 'table'){

				containerWidth = this.width();
				containerLiWidth = $(this).children('table').children("tbody").children('tr:first').children("td").width();
				childrenCount = this.children('table').children("tbody").children('tr:first').children("td").length;
				
				var tableObj = $(this).children("table");

				var _scrolling = setInterval(function(){
						tableObj.animate({marginLeft:"-"+containerLiWidth+"px"},3000,function(){

							tableObj.css({marginLeft:0}).children("tbody").children('tr:first').find("td:first").appendTo(tableObj.children("tbody").children('tr:first'));
					});
				
				},1000);
				
				tableObj.hover(function(){//hover

						$(this).stop(true);
						clearInterval(_scrolling);
				},function(){//leave
					_scrolling = setInterval(function(){
							tableObj.animate({marginLeft:"-"+containerLiWidth+"px"},3000,function(){
								tableObj.css({marginLeft:0}).children("tbody").children('tr:first').find("td:first").appendTo(tableObj.children("tbody").children('tr:first'));
						});
					
					},1000);
				});

				 /* $(this).children("table").animate({marginLeft:"-"+containerLiWidth+"px"},1500,function(){
						$(this).css({marginLeft:0}).children("tbody").children('tr').find("td:first").appendTo(this);
				});*/

			}
		}
		if(containerWidth<parseInt(containerLiWidth*childrenCount)){

		
		}
		
		
	
	}
	/**
	****************************open float*************************************************
	**/
	$.fn.openFlow = function(){
		var width = this.width();
		var liCount = parseInt(width/120);
		//var liCount = 5;
		var lihtml = "<ul class='openflow'>";
		for(var i=0;i<liCount;i++){
			lihtml += "<li></li>";
		}
		lihtml += "</ul>";
		this.append(lihtml);
		this.children(".fowDiv").each(function(){
			
			var minliIndex = -1;
			var minheight = 1000;
			$('.openflow').children('li').each(function(){
				if(minliIndex == -1){//init
					minliIndex = $(this).index();
					minheight = $(this).height();
				}else{//find lower li
					
					if($(this).height()<minheight){
						//alert('ok');
						minliIndex = $(this).index();
						minheight = $(this).height();
						
					}
				}
			});
			//添加
			$('.openflow').children('li').eq(minliIndex).append($(this).clone());
			//删除原有
			$(this).remove();
		});
		
	}
	/************************open pop****************************/
	$.fn.openPop = function(option){

			var htmlContent = $(this).html();
			$(this).html("<div class='openPopContent'><div class='closeX'>[关闭]</div><div id='floatContent2'>"+htmlContent+"</div></div>");

			var j = setInterval("openPopFunction()",option.time);

			//pop(option);
			this.mouseover(function(){
				clearInterval(j);
			}).mouseout(function(){
				j = setInterval("openPopFunction()",option.time);
			});
			
			$('.openPopContent').children('.closeX').click(function(){
				$(this).parent().parent().hide();
				clearInterval(j);
			});
			
			
	}
	/**************************slide pic*************************************/
	$.fn.openSlide = function(option){
		$('.openSlideContainer ul li').eq(0).addClass('focused').removeClass('unfocused');//li focus
		$('.slibetitle div').eq(0).show().siblings().hide();
		$('.openSlideContainer ul li').click(function(){
			var lastIndex = $('.openSlideContainer ul').children('.focused').index();
			$('.openSlideContainer ul').children().eq(lastIndex).removeClass('focused').addClass('unfocused');
			
			
			$('.openSlideContainer .imgContent div').eq($(this).index()).fadeIn('slow').show().siblings().hide();
			$('.openSlideContainer ul').children().eq($(this).index()).addClass('focused').removeClass('unfocused');
			$('.slibetitle div').eq($(this).index()).show().siblings().hide();
			
		});
		
		
		setInterval("picLoop(4)",option.time);
	}
	/***************process bar***********/
	$.fn.openProcess = function(option){
		var rate = 0;
		
		if(option!=null&&option!=undefined)
			rate = option;
		var percent = $(this).attr("percent");
		if(percent!=null&&percent!=undefined&&percent!='')
			rate = percent;

		var barDivHtml = "<div class='openProcessBase'></div><div class='openProcessRate'><span>"+rate+"%</span></div>";
		
		$(this).append(barDivHtml);
		$(this).css("position","relative");
	
		$(this).children(".openProcessRate").css("width",rate+"%");
		
		if(rate>=50){
			$(this).children(".openProcessRate").css("background-color","#0099CC");
		}
		if(rate>=80){
			$(this).children(".openProcessRate").css("background-color","#FF6666");
		}
		if(rate>=100){
			$(this).children(".openProcessRate").css("background-color","#990033");
		}
		
	}
	/**************************************************************************/
	$.fn.openAlert = function(option){
		$(this).css("display",'none');
		var title = option.title==undefined?"title":option.title;
		var contentHtml = $(this).html();
		$(this).html("");
		
		var alertHtml = "<div class='openAlertContainer'> <div class='openAlertTitle'>"+title+"</div><div class='closeX'>[X]</div> <div class='openAlertContent'>"+contentHtml+"</div></div>";
		var manPanel = $(this);
		$(this).append(alertHtml);
		$(this).css("position","fixed");
		$(this).css("right","6px");
		$(this).css("bottom","6px");
		$(this).css("z-index","99");
		$(this).children(".openAlertContainer").children(".closeX").click(function(){
			manPanel.slideUp();
		});
		//if(option.position==""){

		//$(this).animate("{}",1500);
			
		$(this).slideDown();
		//}

	}
	/**************************************************************/
	$.fn.test = function(){
		alert('test');
	}
})(jQuery,window,document);

	function picLoop(count){
			var lastIndex = $('.openSlideContainer ul').children('.focused').index();
			
			$('.openSlideContainer ul li').eq(lastIndex).removeClass('focused').addClass('unfocused');//li恢复背景
			
			lastIndex = (++lastIndex)%count;
			$('.openSlideContainer .imgContent div').eq(lastIndex).fadeIn('slow').show().siblings().hide();;
			$('.openSlideContainer ul li').eq(lastIndex).removeClass('unfocused').addClass('focused');
			$('.slibetitle div').eq(lastIndex).show().siblings().hide();
			
	}

	function openPopFunction(option){
			
			var height = $(window).height();//屏幕高度
			var width = $(window).width();//屏幕宽度


			var div_width = $('.openPopContent').parent().width();
			var div_height = $('.openPopContent').parent().height();
			
			if(option==undefined||option==null){
				option = {'speedx':3,'speedy':3,'time':80};
			}
			var speedx = parseInt($('.openPopContent').parent().attr('speedx')==undefined ?option.speedx:$('.openPopContent').parent().attr('speedx'));
			var speedy = parseInt($('.openPopContent').parent().attr('speedy')==undefined ?option.speedy:$('.openPopContent').parent().attr('speedy'));
			
			$('#getx').val(speedx);
			$('#gety').val(speedy);
			
			var offset = $('.openPopContent').parent().offset();
			
			if(speedx>0){
				if((offset.left+speedx+div_width)>=width){//超出右边界 向回走
					speedx = -(speedx);//turn left
				}
				
			}else if(speedx<0){
				if(parseInt(offset.left+speedx)<=0){//超出左边界
					speedx = -(speedx);//turn right
				}
			}
			
			if(speedy>0){
				if((offset.top+speedy+div_height)>=height){//超出下边界 向回走
					speedy = -(speedy);//turn up
				}
			}
			else if(speedy<0){
				if(parseInt(offset.top+speedy)<=0){//超出上边界
					speedy = -(speedy);//turn down
				}
			}
			
			offset.top = offset.top+parseInt(speedy);
			offset.left = offset.left+parseInt(speedx);
			
			//$('#setx').val(speedx);
			//$('#sety').val(speedy);
			
			$('.openPopContent').parent().attr('speedx',speedx);
			$('.openPopContent').parent().attr('speedy',speedy);
			
			$('.openPopContent').parent().offset(offset);
			
			//$('#x').val(offset.left);
			//$('#y').val(offset.top);
			
	}
	
function openMovePic(){
		$("#slide ul").animate({marginTop:"-33px"},1500,function(){
			$("#slide ul").css({marginTop:0}).find("li:first").appendTo(this);
		});
	}
