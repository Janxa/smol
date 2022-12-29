import React, { Component } from "react";
function About() {
  return (
    <div className="h-full w-full lg:p-4 ">
      <h3 className="text-2xl font-medium text-primary-brown">About SMOL</h3>
      <text className="text-sm  [&>*]:pt-4 flex flex-col lg:text-base">
      <p className="">SMOL is a small demo project I built to shorten urls.</p>
      <hr className="lg:hidden border-b-2 self-center py-2 border-b-primary-brown-2 w-8/12 margin-auto"/>
      <p>
        Its main goal is to display my coding skills, using react and python
        flask in a quick and interesting project.
      </p>
      <p>
        As a demo, <b className=" text-primary-red">smol's database will not keep your urls more than 72 hours</b>.
      </p>
      <hr className="lg:hidden border-b-2 self-center py-2 border-b-primary-brown-2 w-8/12 margin-auto"/>

      <p>
        Smol is an open source project, you can check out how it's built in in
        its github repository =&gt; <a className="whitespace-nowrap text-primary-green-2 font-medium underline hover:text-primary-green" href="https://github.com/Janxa/smol">http://smol.com/Janxa </a> (see what i did there ?
        :)).
      </p>
      <hr className="lg:hidden border-b-2 self-center py-2 border-b-primary-brown-2 w-8/12 margin-auto"/>

      <p>
        If you have any question, feedback, or if you encountered a bug, feel free to
        contact me using this website's contact form, I check my mails
        everyday !
      </p>
      </text>
    </div>
  );
}

export default About;
