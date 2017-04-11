(function($, window){
	if(!$) throw 'popdate-range.js requires jQuery version 1.3 or above'; // require jQuery

	if(!$.fn.on) $.fn.on = $.fn.live || $.fn.bind; //  version < IE 8 fallback

	const monthName = {
		"fullName": [
			"January",
		    "February",
		    "March",
		    "April",
		    "May",
		    "June",
		    "July",
		    "August",
		    "September",
		    "October",
		    "November",
		    "December"
		],
		"shortName": [
			"Jan",
		    "Feb",
		    "Mar",
		    "Apr",
		    "May",
		    "Jun",
		    "Jul",
		    "Aug",
		    "Sep",
		    "Oct",
		    "Nov",
		    "Dec"
		]
	}

	const dayName = {
		"shortName": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		"triName":   ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	} // recommended 2-3 letters only, so UI will be fine

	const weekStartTable = {
		"sunFirst": {offset: 0},
		"monFirst": {offset: 1}
	}

	$.fn.dateFormatter = function(format){
		if(!$.type(this) == "date") throw 'function $.fn.dateFormatter can only be applied to a Date Object';
		var date = this.get(0);
		if(format == "MM/DD/YYYY") return (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
		if(format == "MM-DD-YYYY") return (date.getMonth()+1)+"-"+date.getDate()+"-"+date.getFullYear();
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
				this.defaultValue = "default date";
			})(htmlObject, options);

			htmlObject.dateRangePicker = new function(){
				this.page = new Date();
				this.tempPage = new Date();
				this.dateFormat = "MM/DD/YYYY";
				this.dayFormat = "shortName";
				this.weekFormat = "sunFirst";
				this.monthFormat = "fullName";

				this.maxDate = new Date(8640000000000000);
				this.minDate = new Date(-8640000000000000);

				this.modal = document.createElement("div");
				// this.yearPicker = this.modal.appendChild(document.createElement("div"));
				// this.datePicker = this.modal.appendChild(document.createElement("div"));
				// this.monthPicker = this.modal.appendChild(document.createElement("div"));

				this.calendarAtDate = function(date){
					date = new Date(date.getFullYear(), date.getMonth(), 1);
					var startOfCalendar = new Date(date.getFullYear(), date.getMonth(), 1-date.getDay());
					var endOfCalendar = new Date(date.getFullYear(), date.getMonth() + 1, 1);

					var tbody = document.createElement("table").appendChild(document.createElement("tbody"));

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
								if(this.dateRangePicker.beforeChange) this.dateRangePicker.beforeChange();
								// update selection
								if(this.dateRangePicker.onChange) this.dateRangePicker.onChange();
							});
						}
					}
					return tbody.parentElement;
				}
				this.monthList = function(date){
					var tbody = document.createElement("table").appendChild(document.createElement("tbody"));
					for (var counter = 0; counter < 12; counter++) {
				        if (counter % 4 == 0) var tr = tbody.appendChild(document.createElement("tr"));
						td = $(tr.appendChild(document.createElement("td"))).html(monthName["shortName"][counter]);
				        td.month = counter;

				        if (new Date(date.getFullYear(), date.getMonth()) <= this.maxDate ||
				        	new Date(date.getFullYear(), date.getMonth() + 1) >= this.minDate ) {
				            td.className = "validMonth";
				        } else {
				            td.className = "invalidMonth";
				        }
				    }

					return tbody.parentElement;
				}

				this.yearList = function(date){
					var start = Math.floor((date.getFullYear() - 1) / 12) * 12;
					var tbody = document.createElement("table").appendChild(document.createElement("tbody"));
					for (var counter = 1; counter < 13; counter++) {
				        if (counter % 4 == 1) var tr = tbody.appendChild(document.createElement("tr"));
						td = $(tr.appendChild(document.createElement("td"))).html(start+counter);
				        td.year = start + counter;

				        if (start + counter <= this.maxDate.getFullYear() && start + counter >= this.minDate.getFullYear()) {
				            td.className = "validYear";
				        } else {
				            td.className = "invalidYear";
				        }
				    }

					return tbody.parentElement;
				}

				this.changePage = function(pages, main){
					if(main){
						this.page = new Date(this.page.getFullYear(), this.page.getMonth()+pages);
						//update UI
					}
					else{
						this.tempPage = new Date(this.tempPage.getFullYear(), this.tempPage.getMonth()+pages);
						//update UI
					}
				}

				this.setPicker = function(mode){
					if(mode == 0){
						// show datePicker
						// update UI
					} else if(mode == 1){
						// show monthPicker
						// update UI
					} else {
						// show yearPicker
						// update UI
					}
				}

				this.open = function() {
					if(this.beforeOpen) this.beforeOpen();
					//open modal
					if(this.onOpen) this.onOpen();
				}

				this.close = function(){
					if(this.beforeClose) this.beforeClose();
					// close modal
					if(this.onClose) this.onClose();
				}

			}

			this.on("click", function(){
				// this.dateRangePicker.setPicker(0);
				// document.body.appendChild(this.dateRangePicker.monthList(new Date()));
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