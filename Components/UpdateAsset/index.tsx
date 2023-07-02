// interface UpdateAssetProps {
//   data: {
//     assetcodes: string[];
//     status: string;
//   };
// }

// const UpdateAsset = async (data: UpdateAssetProps['data']): Promise<{ completed: any[]; failure: any[] }> => {
//   try {
//     const completed: any[] = [];
//     const failure: any[] = [];

//     for (const item of data.assetcodes) {
//       const response = await fetch('/api/Post/updateInstall', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ assetCode: item, status: data.status }),
//       });

//       if (!response.ok) {
//         throw new Error('Request failed');
//       }

//       const responseData = await response.json();

//       if (responseData.success === true) {
//         // Call another API when response message is 34
//         const anotherResponse = await fetch('/api/Post/updateStatus', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ assetCode: item, status: data.status }),
//         });

//         if (!anotherResponse.ok) {
//           throw new Error('Request failed');
//         }

//         const anotherResponseData = await anotherResponse.json();
//         completed.push({ assetCode: item, APIResolve: 'update status' });
//       } else {
//         failure.push({ assetCode: item, APIResolve: 'update install' });
//       }
//     }
//     return { completed, failure };
//   } catch (error) {
//     console.error(error);
//     return { completed: [], failure: [] };
//   }
// };

// export default UpdateAsset;




interface UpdateAssetProps {
  data: {
    assetcodes: string[];
    status: string;
  };
}

const UpdateAsset = async (
  data: UpdateAssetProps['data'],
  onProgress: (progress: number) => void
): Promise<{ completed: any[]; failure: any[] }> => {
  try {
    const completed: any[] = [];
    const failure: any[] = [];
    const totalItems = data.assetcodes.length;
    let progress = 0;

    for (const item of data.assetcodes) {
      const response = await fetch('/api/Post/updateInstall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assetCode: item, status: data.status }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();

      if (responseData.success === true) {
        // Call another API when response message is 34
        const anotherResponse = await fetch('/api/Post/updateStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ assetCode: item, status: data.status }),
        });

        if (!anotherResponse.ok) {
          throw new Error('Request failed');
        }

        const anotherResponseData = await anotherResponse.json();
        completed.push({ assetCode: item, APIResolve: 'update status' });
      } else {
        failure.push({ assetCode: item, APIResolve: 'update install' });
      }

      progress++;
      const progressPercentage = (progress / totalItems) * 100;
      onProgress(progressPercentage);
    }

    return { completed, failure };
  } catch (error) {
    console.error(error);
    return { completed: [], failure: [] };
  }
};

export default UpdateAsset;


// interface UpdateAssetProps {
//   data: {
//     assetcodes: string[];
//     status: string;
//   };
// }

// const UpdateAsset = async (data: UpdateAssetProps['data']): Promise<any[]> => {
//   try {
//     const updatedResponses: any[] = [];

//     for (const item of data.assetcodes) {
//       const response = await fetch('/api/Post/updateInstall', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ assetCode: item, status: data.status }),
//       });

//       if (!response.ok) {
//         throw new Error('Request failed');
//       }

//       const responseData = await response.json();

//       if (responseData.success === true) {
//         // Call another API when response message is 34
//         const anotherResponse = await fetch('/api/Post/updateStatus', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ assetCode: item, status: data.status }),
//         });

//         if (!anotherResponse.ok) {
//           throw new Error('Request failed');
//         }

//         const anotherResponseData = await anotherResponse.json();
//         updatedResponses.push(anotherResponseData);
//       } else {
//         updatedResponses.push(responseData);
//       }
//     }

//     return updatedResponses;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export default UpdateAsset;
