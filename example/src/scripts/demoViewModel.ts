import {ISBFLocalization, ISBFObservable, SBFObservable} from "@mobilotronic/sbf";

interface ICountry{
    name: string;
    code: string;
}

interface ICity{
    country: string;
    name: string;
    lat: string;
    lng: string;
}

const countries = require("../data/countries.json");
const cities = require("../data/cities.json");

export class DemoViewModel{
    private translator: ISBFLocalization;

    private inputSearchKeyDown(event: KeyboardEvent){}

    //#region constructor
    constructor(translator: ISBFLocalization) {
        this.translator = translator;
        this.Countries.value = countries;
        this.Cities.value = cities;
    }
    //#endregion

    public SearchValue:ISBFObservable<string> = new SBFObservable("");
    public FirstName:ISBFObservable<string> = new SBFObservable("");
    public LastName:ISBFObservable<string> = new SBFObservable("");
    public UserName:ISBFObservable<string> = new SBFObservable("");
    public Email:ISBFObservable<string> = new SBFObservable("");
    public Address:ISBFObservable<string> = new SBFObservable("");
    public Address2:ISBFObservable<string> = new SBFObservable("");
    public ZipCode:ISBFObservable<string> = new SBFObservable("");
    public Countries:ISBFObservable<Array<ICountry>> = new SBFObservable([]);
    public SelectedCountry:ISBFObservable<ICountry> = new SBFObservable(null);
    public Cities:ISBFObservable<Array<ICity>> = new SBFObservable([]);
    public SelectedCity:ISBFObservable<ICity> = new SBFObservable(null);
    public ShippingAddressIsSameAsBilling:ISBFObservable<boolean> = new SBFObservable(false);
    public SaveForNextTime:ISBFObservable<boolean> = new SBFObservable(false);
    public PaymentType:ISBFObservable<string> = new SBFObservable("");
    public CardHolderName:ISBFObservable<string> = new SBFObservable("");
    public CardNumber:ISBFObservable<string> = new SBFObservable("");
    public Expiration:ISBFObservable<Date> = new SBFObservable(null);
    public CVV:ISBFObservable<string> = new SBFObservable("");
    public PromoCode:ISBFObservable<string> = new SBFObservable("");
}
