import React, { useEffect, useState } from "react";
import { Button } from "antd";

interface Props {
  province: string;
}

export default function LocationsMap(props: Props): JSX.Element {
  const { province } = props;

  console.log(province);

  const provinceMapURLsList = [
    {
      id: "ALL",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.3382536588!2d106.4150395052842!3d10.755341073300812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664304816248!5m2!1sen!2s",
    },
    {
      id: "1",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.3382536588!2d106.4150395052842!3d10.755341073300812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664304816248!5m2!1sen!2s",
    },
    {
      id: "2",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.622741103216!2d105.72255086760377!3d10.03426963299133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f09dbfb20b659!2zQ2FuIFRobywgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1664304890166!5m2!1sen!2s",
    },
    {
      id: "3",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124762.63190650073!2d109.17646191377486!3d12.259629019199268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3170677811cc886f%3A0x5c4bbc0aa81edcb9!2zTmhhIFRyYW5nLCBLaMOhbmggSMOyYSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1664304946223!5m2!1sen!2s",
    },
    {
      id: "4",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.980384379247!2d105.81945410425034!3d21.022778763209775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIEhvw6BuIEtp4bq_bSwgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1664304987698!5m2!1sen!2s",
    },
    {
      id: "5",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251289.70611554733!2d103.81733923946966!3d10.229153360192534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78c62b49eda17%3A0x8aa79fbbdd72cdb!2zUGjDuiBRdeG7kWM!5e0!3m2!1sen!2s!4v1664305020502!5m2!1sen!2s",
    },
    {
      id: "6",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245367.85398639366!2d107.93804183246785!3d16.072093418511496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2sDa%20Nang%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664305063407!5m2!1sen!2s",
    },
    {
      id: "7",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124928.46787972613!2d108.38068261201116!3d11.904070184564798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef20988b1%3A0xad5f228b672bf930!2sDalat%2C%20Lam%20Dong%2C%20Vietnam!5e0!3m2!1sen!2s!4v1664305089519!5m2!1sen!2s",
    },
    {
      id: "8",
      url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125371.8242299962!2d108.10391825750443!3d10.89752052395374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3176830f876e16e5%3A0x2a82c373d3a16cc8!2zUGhhbiBUaGlldCwgQsOsbmggVGh14bqtbiwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1664305120914!5m2!1sen!2s",
    },
  ];

  // const filteredProvinceMapURLs = provinceMapURLsList
  //   .filter((ele, idx) => ele.id === province)
  //   .map((ele) => ele.url);

  const filteredProvinceMapURLs = provinceMapURLsList
    .filter((ele, idx) => ele.id === province)
    .reduce((previousValue, currentValue) => {
      return (previousValue = currentValue.url);
    }, "");

  const [provinceMapURL, setProvinceMapURL] = useState<string>(
    provinceMapURLsList[0].url
  );

  const handleClick = (filteredProvinceMapURLs: string) => {
    setProvinceMapURL(filteredProvinceMapURLs);
  };

  useEffect(() => {
    if (province) {
      setProvinceMapURL(filteredProvinceMapURLs);
    } else {
      setProvinceMapURL(provinceMapURLsList[0].url);
    }
  }, [province]);

  return (
    <div style={{ width: `100%`, height: `100%` }}>
      <iframe
        src={provinceMapURL}
        width={`100%`}
        height={`550px`}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
