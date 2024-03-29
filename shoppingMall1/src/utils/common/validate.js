export const ptn = {
	//最多n位小数
	decimal:function(decimallen){
		return '^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,'+decimallen+'})))$';
	},
	//电话号码
    phone: function() {
      return '^[0-9\\s-+]+$'
    },
    // 中英文数字
    cn_en_num: function(min = 0, max = 9999) {
      return '^[A-Za-z0-9\u4e00-\u9fa5 ]{' + min + ',' + max + '}$'
    },
    // 中英文数字点
    cn_en_num_point: function(min = 0, max = 9999) {
      return '^[A-Za-z0-9\u4e00-\u9fa5.{}]{' + min + ',' + max + '}$'
    },
    // 中英文数字冒号
    cn_en_num_colon: function(min = 0, max = 9999) {
      return '^[A-Za-z0-9\u4e00-\u9fa5:{}]{' + min + ',' + max + '}$'
    },
    // 正整数方式二,允许包含0，如10,20等
    positive_interger_two: function() {
      return '^[1-9][0-9{}]{0,10}$'
    },
    request_api: function(min = 0, max = 9999){
      return '^(((https|http)?:\\/\\/)|(\\/))[^\\s]{' + min + ',' + max + '}$';
    },
    // IP + 端口号
    ip_and_port: function(){
      return '^(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d{1,2}|1\\d\\d|2[0-4]\\d|25[0-5])\\:([0-9]|[1-9]\\d{1,3}|[1-5]\\d{4}|6[0-5]{2}[0-3][0-5])$';
    },
    // 中文数字
    cn_num: function(min = 0, max = 9999) {
      return '^[0-9\u4e00-\u9fa5]{' + min + ',' + max + '}$'
    },
    // 英文数字
    en_num: function(min = 0, max = 9999) {
      return '^[A-Za-z0-9 ]{' + min + ',' + max + '}$'
    },
    // 英文数字反斜杠
    en_num_backslash: function(min = 0, max = 9999) {
      return '^[/a-zA-Z0-9{}}]{' + min + ',' + max + '}$'
    },
    // 英文数字下划线
    en_num_line: function(min = 0, max = 9999) {
      return '^[_a-zA-Z0-9 ]{' + min + ',' + max + '}$'
    },
    // 英文下划线
    en_line: function(min = 0, max = 9999) {
      return '^[_a-zA-Z ]{' + min + ',' + max + '}$'
    },
    // 英文数字点
    en_num_point: function(min = 0, max = 9999) {
      return '^[a-zA-Z0-9.' +
        '' +
        ' ]{' + min + ',' + max + '}$'
    },
    // 中文、英文、数字及下划线
    cn_en_num_line: function(min = 0, max = 9999) {
      return '^[\u4e00-\u9fa5_a-zA-Z0-9 ]{' + min + ',' + max + '}$'
    },
    // 正整数
    positive_interger: function() {
      return '^[1-9]+\\d*$'
    },
    // 中文
    cn: function(min = 0, max = 9999) {
      return '^[\u4e00-\u9fa5]{' + min + ',' + max + '}$'
    },
    // 英文
    en: function(min = 0, max = 9999) {
      return '^[A-Za-z ]{' + min + ',' + max + '}$'
    },
    // 中文、英文、数字及中划线
    cn_en_num_cen_line: function(min = 0, max = 9999) {
      return '^[A-Za-z0-9-\u4e00-\u9fa5 ]{' + min + ',' + max + '}$'
    },
    // 英文中文
    en_cn: function(min = 0, max = 9999) {
      return '^[A-Za-z\u4e00-\u9fa5]{' + min + ',' + max + '}$'
    },
    // 英文中文分号
    en_cn_semicolon: function(min = 0, max = 9999) {
      return '^[;A-Za-z\u4e00-\u9fa5]{' + min + ',' + max + '}$'
    },
    // 通配限制长度
    all_match: function(min = 0, max = 9999) {
      return '^[\\s\\S]{' + min + ',' + max + '}$'
    },
    // 英文,点，中划线和下划线
    en_dot_line: function(min = 0, max = 9999) {
      return '^[-A-Za-z\._]{' + min + ',' + max + '}$'
    },
    // 数字
    number: function(min = 0, max = 9999) {
      return '^[0-9]{' + min + ',' + max + '}$'
    },
    number_dot: function() {
      return '/^\\d+(\\.\\d+)?$/'
    },
    // 英文和常用字符
    en_common_character: function(min = 0, max = 9999) {
      return '^[^0-9^\u4e00-\u9fa5^ ]{' + min + ',' + max + '}$'
    },
    // 不带空白字符英文数字
    pure_en_num: function(min = 0, max = 9999) {
      return '^[A-Za-z0-9]{' + min + ',' + max + '}$'
    },
    email: function(min = 0, max = 9999) {
      return '^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$'
    },
    validateDateRange:function(rule, dates, callback){
    	if(!dates||dates.length==0||!dates[0]||!dates[1]){
			callback(new Error('请选择时间！'));
		}else if(dates[0]<new Date(2018,0,1)){
			callback(new Error('开始时间不能早于2018-01-01！'));
		}else if(dates[0]>dates[1]){
			callback(new Error('开始时间不能早于结束时间！'));
		}else if(dates[1]>new Date(dates[0].getTime()+366*24*3600*1000)){
			callback(new Error('结束时间不能晚于开始时间一年以后！'));
		}else if(dates[1]>new Date()){
			callback(new Error('结束时间不能晚于当前时间！'));
		}else{
			callback();
		}
   },
   validatePassword:function(rule, data, callback){
   		if(data.length<8||data.length>18){
   			callback(new Error('8-18位，需包含字母、数字！'));
   		}else if(!/[0-9]/.test(data)){
   			callback(new Error('8-18位，需包含字母、数字！'));
   		}else if(!/[a-zA-Z]/.test(data)){
   			callback(new Error('8-18位，需包含字母、数字！'));
   		}else{
			callback();
		}
   }
  }
  