(function($, window){
	if(!$.fn.on) $.fn.on = $.fn.live || $.fn.bind; //  version < IE 8 fallback

	const dayName = {
		"shortName": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
	}

	$.fn.dateFormatter = function(format){
		if(!$.type(this) == "date") throw 'function $.fn.dateFormatter can only be applied to a Date Object';
		var date = this.get(0);
		if(format == "MM/DD/YYYY") return (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
	}

	$.fn.codeNinjaDateRangePicker = function(options){
		//default options
		if(this.length == 1){
			if(!this.is("input")){
				throw 'function $.fn.dateRangePicker can only be applied to a single HTMLInputObject';
			}

			var htmlObject = this.get(0);

			(function initialize(object, options){
				object.options = {};
				for (var key in options) {
				    //change options
				    //format object.options = options[key] || defaultValue
				}
				this.defaultValue = "something";
			})(htmlObject, options);

			htmlObject.dateRangePicker = new function(){
				this.page = new Date();
				this.dateFormat = "MM/DD/YYYY";
				this.dayFormat = "shortName";
				this.calendarAtDate = function(date){
					date = new Date(date.getFullYear(), date.getMonth(), 1);
					var startOfCalendar = new Date(date.getFullYear(), date.getMonth(), 1-date.getDay());
					var endOfCalendar = new Date(date.getFullYear(), date.getMonth() + 1, 1);

					var calendar = document.createElement("table");
					var tbody = calendar.appendChild(document.createElement("tbody"));

					var tr = tbody.appendChild(document.createElement("tr"));

					for(var i = 0; i < 7; i++){
						td = tr.appendChild(document.createElement("td"));
						td.innerHTML = this.customNames || dayName[this.dayFormat][i];
					}

					for(var i = 0, counter = startOfCalendar; i < 42; i++, counter.setDate(counter.getDate()+1)){
						if( i%7 == 0 ) tr = tbody.appendChild(document.createElement("tr"));
						(td = tr.appendChild(document.createElement("td"))) && (td.innerHTML = "<div>"+counter.getDate()+"</div>");
						if(counter<this.minDate||counter>this.maxDate||counter.getMonth()!=date.getMonth()){
							$(td).addClass("invalidDay");
						} else {
							(td.date = new Date(counter.getTime())) && (td.dateRangePicker = this);
							$(td).addClass("validDay").on("click", function(){
								//update selected date
							});
						}
					}
					return calendar;
				}
				this.changePage = function(pages){
					this.page = new Date(this.page.getFullYear(), this.page.getMonth()+pages);
				}
			}

			this.on("click", function(){
				//attach date range picker to input
			});

			return this;
	    } else if(this.length > 1){
	    	this.each(function(){
	    		$(this).codeNinjaDateRangePicker();
	    	});
	    	return this;
	    } else return null;
	}
})(jQuery, window);