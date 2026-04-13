// Función para calcular y establecer los datos de las fechas. 

const months = [
        "ENE","FEB","MAR","ABR","MAY","JUN",
        "JUL","AGO","SEP","OCT","NOV","DIC"
    ];
const weekDays = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];


export const generateAnualCalendarClient = (year)=>{
    const calendar = [];

    const today = new Date();
     for(let i=today.getMonth(); i<=today.getMonth()+3; i++){
         const monthName = months[i]
         const monthDays = new Date (year, i+ 1, 0).getDate(); // Ultimo dia del mes
        
         for(let day=1; day<=monthDays; day++){
             if(today.getMonth()==i && day<today.getDate())  continue;
             if(i== today.getMonth()+3 && day>today.getDate()) continue;
             const date = new Date(year,i, day)
             let m = i+1;
             if(m<=9) m = `0${m}`
             let d = day;
             if(d<=9) d=`0${day}`

             calendar.push({
                year,
                month: [m, monthName],
                day: [d, weekDays[date.getDay()]]
             })
         }
     }

    
    return calendar
}
export const generateAnualCalendarAdmin = (year)=>{
        const calendar = [];

     for(let i=0; i<=11; i++){
        const monthName = months[i]
        const monthDays = new Date (year, i+ 1, 0).getDate(); // Ultimo dia del mes
        
        for(let day=1; day<=monthDays; day++){
            const date = new Date(year,i, day)
            let m = i+1;
            if(m<=9) m = `0${m}`
            let d = day;
            if(d<=9) d=`0${day}`

            calendar.push({
               year,
               month: [m, monthName],
               day: [d, weekDays[date.getDay()]]
            })
        }
    }
    return calendar
}