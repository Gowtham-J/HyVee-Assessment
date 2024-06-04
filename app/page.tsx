/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  AgeResponse,
  CountryResponse,
  GenderResponse,
  UserData,
} from "@/interface";
import { getCountryName } from "@/utils/getCountryName";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const ageResponse = await fetch(`https://api.agify.io?name=${name}`);
      if (!ageResponse.ok) throw new Error("Failed to fetch age data");
      const ageData: AgeResponse = await ageResponse.json();

      const genderResponse = await fetch(
        `https://api.genderize.io?name=${name}`
      );
      if (!genderResponse.ok) throw new Error("Failed to fetch gender data");
      const genderData: GenderResponse = await genderResponse.json();

      const countryResponse = await fetch(
        `https://api.nationalize.io?name=${name}`
      );
      if (!countryResponse.ok) throw new Error("Failed to fetch country data");
      const countryData: CountryResponse = await countryResponse.json();

      const countryName =
        countryData.country.length > 0
          ? getCountryName(countryData.country[0]?.country_id) || "Unknown"
          : "Unknown";

      setTimeout(() => {
        setLoading(false);
        setData({
          name,
          age: ageData.age,
          gender: genderData?.gender || "Unknown",
          country: countryName,
        });
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setError(true);
        setData({
          name,
          age: "Unknown",
          gender: "Unknown",
          country: "Unknown",
        });
      }, 1000);
    }
  };

  return (
    <div className="font-mono bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div
          className="flex justify-center px-6 my-12"
          style={{ minHeight: "30rem" }}
        >
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{
                backgroundImage:
                  "url('https://source.unsplash.com/oWTW-jNGl9I/600x800')",
              }}
            ></div>
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              {!data ? (
                <div>
                  <div className="px-8 mb-4 text-center">
                    <h4>helooooo</h4>
                    <h3 className="pt-4 mb-2 text-2xl">What's your name?</h3>
                    <p className="mb-4 text-sm text-gray-700">
                      Give us your name so we can play detective and figure out
                      your age, gender, and country. Who needs privacy anyway?
                    </p>
                  </div>
                  <form
                    className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Name
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter Your Name..."
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "..." : "Submit"}
                      </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <p className="mb-4 text-sm text-gray-700 text-center">
                      Buckle Up!!!
                    </p>
                  </form>
                </div>
              ) : (
                <div>
                  <div className="px-8 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl">
                      Hi {data.name[0].toUpperCase() + name.slice(1)}
                    </h3>
                    <p className="mb-2 text-sm text-gray-700">
                      Age: {data.age}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">
                      Gender: {data.gender}
                    </p>
                    <p className="mb-2 text-sm text-gray-700">
                      Country: {data.country}
                    </p>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full mt-8 px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => {
                        setData(null);
                        setName("");
                      }}
                    >
                      Reset
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="px-8 pt-6 pb-8 mb-4">
                    {error ? (
                      <p className="mb-4 text-sm text-gray-700 text-center">
                        We're sorry, but our server just took a coffee break
                        instead of doing its job. We'll send it a
                        strongly-worded memo.
                      </p>
                    ) : (
                      <p className="mb-4 text-sm text-gray-700 text-center">
                        Congratulations, Sherlock! We've got the scoop on your
                        age, gender, and country. Now, let's solve the mystery
                        of what you'll have for dinner tonight.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
