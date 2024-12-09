import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const UsersProfile = () => {
    const {isPending, isError, error, data: users} = useQuery({
        queryKey: ["users"],
        queryFn: async() => {
            const response = await fetch("https://espresso-emporium-server-lyart.vercel.app/users");
            return response.json();
        }
    })
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     fetch("https://espresso-emporium-server-lyart.vercel.app/users")
    //     .then(res => res.json())
    //     .then(data => setUsers(data))
    // }, []);

    const handleUserDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "Are you sure that you want to delete the user?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete the user!",
        }).then((result) => {
          if (result.isConfirmed) {
            // Delete from the database
            fetch(`https://espresso-emporium-server-lyart.vercel.app/users/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  Swal.fire({
                    title: "Good Luck!!!",
                    text: "Deleted the User",
                    icon: "success",
                  });
    
                //   const remainingUsers = users.filter((user) => user._id !== id);
                //   setUsers(remainingUsers);
                }
              });
          }
        });
      };

      if(isPending){
      return <div className="flex justify-center items-center py-40">
        <span className="loading loading-ring text-error text-xl loading-lg"></span>
      </div>
    };

    if(isError){
        return <p className="text-center text-xl font-bold">{error.message}</p>
    };

    return (
        <div className="md:w-4/5 w-11/12 mx-auto py-12">
        <Link to="/signIn">
          <button className="btn btn-outline border-2 border-indigo-500 rounded-full text-lg hover:bg-violet-500 hover:border-none font-bold shadow-md">
            New User <FaUserPlus />
          </button>
        </Link>
  
        <div className="overflow-x-auto">
          <table className="table mt-8">
            {/* head */}
            <thead className="bg-gray-900 *:text-white font-bold">
              <tr>
                <th>ID</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Last Sign In</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="*:font-medium">
                  <th>{index + 1}</th>
                  <td>
                    <img
                      className="w-12 lg:h-12 h-10 rounded-lg"
                      src={user?.photo}
                      alt={user?.name}
                    />
                  </td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.createdTime}</td>
                  <td>{user?.lastSignInTime}</td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <Link to={`/updateProfile/${user._id}`}>
                        <button className="text-info text-2xl border border-gray-200 shadow-md p-2 rounded-lg">
                          <MdOutlineEdit />
                        </button>
                      </Link>
  
                      <button
                        onClick={() => handleUserDelete(user._id)}
                        className="text-rose-500 text-2xl border border-gray-200 shadow-md p-2 rounded-lg"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default UsersProfile;