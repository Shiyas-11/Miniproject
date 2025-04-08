"use client";

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form className="bg-white p-6 rounded-lg shadow-lg w-80">
        <input type="text" placeholder="Full Name" className="w-full px-3 py-2 border rounded-lg mb-2" />
        <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg mb-2" />
        <input type="text" placeholder="Phone Number" className="w-full px-3 py-2 border rounded-lg mb-2" />
        <input type="text" placeholder="Institution" className="w-full px-3 py-2 border rounded-lg mb-2" />
        <select className="w-full px-3 py-2 border rounded-lg mb-2">
          <option>Branch</option>
          <option>IT</option>
          <option>ME</option>
          <option>CE</option>
          <option>EEE</option>
          <option>EC</option>
          <option>CS</option>
        </select>
        <select className="w-full px-3 py-2 border rounded-lg mb-2">
          <option>Year of study</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <input type="text" placeholder="Register Number" className="w-full px-3 py-2 border rounded-lg mb-2" />
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default Register;
