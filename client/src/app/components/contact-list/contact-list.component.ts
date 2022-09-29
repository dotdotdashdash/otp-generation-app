import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: any = [
    {
      "_id": "63347d8b4e33165ae7543de9",
      "name": "Betty Dyer",
      "gender": "female",
      "company": "ENQUILITY",
      "email": "bettydyer@enquility.com",
      "phone": "+1 (822) 494-2069",
      "address": "549 Coles Street, Nipinnawasee, Puerto Rico, 3189",
      "registered": "2019-03-17T04:20:33 -06:-30"
    },
    {
      "_id": "63347d8b0d552b61154631ba",
      "name": "Holland Booker",
      "gender": "male",
      "company": "GLOBOIL",
      "email": "hollandbooker@globoil.com",
      "phone": "+1 (831) 521-2848",
      "address": "275 Williams Avenue, Websterville, West Virginia, 2748",
      "registered": "2014-01-23T02:04:44 -06:-30"
    },
    {
      "_id": "63347d8b4b3971df27dadf4e",
      "name": "Armstrong Schneider",
      "gender": "male",
      "company": "EXOVENT",
      "email": "armstrongschneider@exovent.com",
      "phone": "+1 (854) 566-3224",
      "address": "172 Schroeders Avenue, Keyport, New York, 4170",
      "registered": "2014-02-01T07:19:05 -06:-30"
    },
    {
      "_id": "63347d8be367787592a53d25",
      "name": "Gutierrez Small",
      "gender": "male",
      "company": "INDEXIA",
      "email": "gutierrezsmall@indexia.com",
      "phone": "+1 (855) 471-3247",
      "address": "431 Jackson Street, Downsville, Federated States Of Micronesia, 5940",
      "registered": "2022-05-18T08:04:59 -06:-30"
    },
    {
      "_id": "63347d8b79f8d121a255ddf9",
      "name": "Garrison Ewing",
      "gender": "male",
      "company": "MIXERS",
      "email": "garrisonewing@mixers.com",
      "phone": "+1 (928) 573-2975",
      "address": "305 Hart Place, Dana, Kansas, 4793",
      "registered": "2014-03-02T07:30:44 -06:-30"
    },
    {
      "_id": "63347d8b9b82a3c3f84234eb",
      "name": "Levy Taylor",
      "gender": "male",
      "company": "GEEKOSIS",
      "email": "levytaylor@geekosis.com",
      "phone": "+1 (894) 434-3375",
      "address": "400 Louise Terrace, Glidden, Hawaii, 4695",
      "registered": "2021-01-12T09:26:44 -06:-30"
    },
    {
      "_id": "63347d8b3a715491a96c1f9b",
      "name": "Rene Miranda",
      "gender": "female",
      "company": "BOVIS",
      "email": "renemiranda@bovis.com",
      "phone": "+1 (968) 564-2839",
      "address": "676 Erasmus Street, Byrnedale, Missouri, 202",
      "registered": "2014-05-16T05:19:15 -06:-30"
    },
    {
      "_id": "63347d8ba8fe6e89c4e58c94",
      "name": "Rhea Gamble",
      "gender": "female",
      "company": "OBONES",
      "email": "rheagamble@obones.com",
      "phone": "+1 (934) 443-3106",
      "address": "118 Bayview Avenue, Aguila, Delaware, 3189",
      "registered": "2016-04-12T10:37:15 -06:-30"
    },
    {
      "_id": "63347d8be1aaacbc5d30e5db",
      "name": "Enid Bradley",
      "gender": "female",
      "company": "SECURIA",
      "email": "enidbradley@securia.com",
      "phone": "+1 (957) 473-2964",
      "address": "671 Fair Street, Faxon, Massachusetts, 6978",
      "registered": "2020-06-06T05:46:18 -06:-30"
    },
    {
      "_id": "63347d8bd619ad363689f8a1",
      "name": "Vinson Gallegos",
      "gender": "male",
      "company": "EURON",
      "email": "vinsongallegos@euron.com",
      "phone": "+1 (803) 424-3354",
      "address": "161 Oriental Boulevard, Moquino, Marshall Islands, 7826",
      "registered": "2014-12-16T06:44:48 -06:-30"
    },
    {
      "_id": "63347d8b3dad4484c26ee9ba",
      "name": "Stephanie Hardin",
      "gender": "female",
      "company": "PYRAMAX",
      "email": "stephaniehardin@pyramax.com",
      "phone": "+1 (934) 562-2102",
      "address": "565 Newkirk Avenue, Motley, Arkansas, 8311",
      "registered": "2017-04-12T07:55:50 -06:-30"
    },
    {
      "_id": "63347d8b7331c19ed8140cbe",
      "name": "Eleanor Olsen",
      "gender": "female",
      "company": "DIGIRANG",
      "email": "eleanorolsen@digirang.com",
      "phone": "+1 (891) 445-2129",
      "address": "475 Pooles Lane, Carlton, Rhode Island, 9595",
      "registered": "2018-01-16T06:48:19 -06:-30"
    },
    {
      "_id": "63347d8b6b83b904af35023f",
      "name": "Thornton Parker",
      "gender": "male",
      "company": "PROSELY",
      "email": "thorntonparker@prosely.com",
      "phone": "+1 (880) 428-2181",
      "address": "736 Middagh Street, Canby, Washington, 7853",
      "registered": "2014-10-15T11:31:21 -06:-30"
    },
    {
      "_id": "63347d8b8abfe5abae52e869",
      "name": "Patton Ochoa",
      "gender": "male",
      "company": "MOMENTIA",
      "email": "pattonochoa@momentia.com",
      "phone": "+1 (886) 580-3496",
      "address": "666 Fillmore Place, Westmoreland, Indiana, 344",
      "registered": "2016-01-27T02:28:23 -06:-30"
    },
    {
      "_id": "63347d8b4d9c2c1ebf1751d7",
      "name": "Pace Carpenter",
      "gender": "male",
      "company": "ENERFORCE",
      "email": "pacecarpenter@enerforce.com",
      "phone": "+1 (923) 527-2628",
      "address": "476 Perry Terrace, Boykin, Illinois, 1535",
      "registered": "2019-05-07T11:15:28 -06:-30"
    },
    {
      "_id": "63347d8b1e77f7637514c7d9",
      "name": "Deann Puckett",
      "gender": "female",
      "company": "KYAGURU",
      "email": "deannpuckett@kyaguru.com",
      "phone": "+1 (843) 561-2593",
      "address": "502 Aster Court, Allensworth, Maine, 761",
      "registered": "2016-07-31T11:34:57 -06:-30"
    },
    {
      "_id": "63347d8b82e5ad39638b8096",
      "name": "Park Salazar",
      "gender": "male",
      "company": "CORPORANA",
      "email": "parksalazar@corporana.com",
      "phone": "+1 (996) 585-3857",
      "address": "819 Maple Avenue, Lacomb, Palau, 3891",
      "registered": "2014-07-31T12:22:55 -06:-30"
    },
    {
      "_id": "63347d8b40d034441e073892",
      "name": "Rich Hamilton",
      "gender": "male",
      "company": "EVENTEX",
      "email": "richhamilton@eventex.com",
      "phone": "+1 (875) 577-3641",
      "address": "587 Amherst Street, Craig, California, 3471",
      "registered": "2017-07-03T06:50:03 -06:-30"
    },
    {
      "_id": "63347d8b1f2beea6b8056e24",
      "name": "Morse Glass",
      "gender": "male",
      "company": "NITRACYR",
      "email": "morseglass@nitracyr.com",
      "phone": "+1 (976) 486-2884",
      "address": "526 Adler Place, Cherokee, District Of Columbia, 8022",
      "registered": "2021-11-02T04:06:15 -06:-30"
    },
    {
      "_id": "63347d8b0edea4231b12ba88",
      "name": "Hilda Avery",
      "gender": "female",
      "company": "MOTOVATE",
      "email": "hildaavery@motovate.com",
      "phone": "+1 (902) 582-2588",
      "address": "713 Ebony Court, Silkworth, Minnesota, 3500",
      "registered": "2019-06-14T02:39:06 -06:-30"
    },
    {
      "_id": "63347d8bf02f1f87626f49c3",
      "name": "Elliott Harrington",
      "gender": "male",
      "company": "SHADEASE",
      "email": "elliottharrington@shadease.com",
      "phone": "+1 (845) 407-3972",
      "address": "230 Congress Street, Thynedale, Alabama, 1302",
      "registered": "2016-04-04T03:46:54 -06:-30"
    },
    {
      "_id": "63347d8bd4f920cb0b81a5d7",
      "name": "Mandy Bell",
      "gender": "female",
      "company": "COMVERGES",
      "email": "mandybell@comverges.com",
      "phone": "+1 (842) 458-2431",
      "address": "785 Manhattan Court, Boonville, Wisconsin, 6139",
      "registered": "2016-07-11T02:24:17 -06:-30"
    },
    {
      "_id": "63347d8b0d7cd76e044281f4",
      "name": "Pearlie Whitaker",
      "gender": "female",
      "company": "STUCCO",
      "email": "pearliewhitaker@stucco.com",
      "phone": "+1 (890) 448-2136",
      "address": "619 Hicks Street, Cornfields, Tennessee, 8811",
      "registered": "2019-07-17T10:34:57 -06:-30"
    },
    {
      "_id": "63347d8ba44136eafd6ad074",
      "name": "Rosario Church",
      "gender": "female",
      "company": "TELLIFLY",
      "email": "rosariochurch@tellifly.com",
      "phone": "+1 (861) 449-3438",
      "address": "114 Ocean Court, Yogaville, Oregon, 288",
      "registered": "2015-11-23T08:02:14 -06:-30"
    },
    {
      "_id": "63347d8b42c266d0a3696081",
      "name": "Roberts Garza",
      "gender": "male",
      "company": "COMDOM",
      "email": "robertsgarza@comdom.com",
      "phone": "+1 (864) 584-2250",
      "address": "757 Tompkins Avenue, Cedarville, Louisiana, 4165",
      "registered": "2016-10-17T03:49:28 -06:-30"
    }
  ]

  displayedColumns: string[] = ['slNo', 'name', 'phone', 'email'];
  dataSource = new MatTableDataSource(this.contacts)

  constructor(
    private router: Router,
    private contactServices: ContactsService
  ) { }

  ngOnInit(): void {
  }

  viewContact(row: any) {
    console.log(row);
  }

  search(text: any) {
    console.log(text.value);
    this.dataSource.filter = text.value.trim().toLowerCase();
  }

  uploadContactsJson(e: any) {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (event: any)=> {
        this.contactServices.uploadContacts((JSON.parse(event.target.result)));
      }
      reader.onerror = (event: any)=> {
        console.log('error reading file');
      }
    } else {
      alert('No file found. Try again')
    }
  }

}
