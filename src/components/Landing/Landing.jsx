import React, { useEffect, useState } from "react";
import videoUrl from "../../assets/paint.mp4";
import Input from "../Input/Input";
import { AiOutlineClose as Close } from "react-icons/ai";
const Landing = ({ setColorsNeedUpdate, setPixelData, setImgFile }) => {
	useEffect(() => {
		const video = document.getElementById("background-video");
		video.muted = true;
		video.play();
	}, []);

	const [showModal, setShowModal] = useState(false);

	function handleModalChange() {
		setShowModal((prev) => !prev);
	}

	return (
		<>
			<div className="w-full h-full fixed">
				<video
					poster="../../assets/paint-img.png"
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						top: 0,
						left: 0,
						objectFit: "cover",
						zIndex: "-10",
					}}
					autoPlay
					playsInline
					loop
					muted
					id="background-video">
					<source src={videoUrl} type="video/mp4" />
				</video>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						zIndex: "-1",
						background:
							"linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%)",
					}}
				/>

				<div className="text-white relative text-center z-10 flex flex-col items-center justify-center h-full px-10 w-full">
					<h1 className="mb-16 main-header">Palette Pal</h1>
					<p className="main-description mb-8 text-xs">
						Welcome to Palette Pal, an interactive color picker! Simply upload
						an image and receive a color palette suggestion based on that image!
					</p>
					<Input
						className="input-area"
						setPixelDataForParent={setPixelData}
						setColorsNeedUpdate={setColorsNeedUpdate}
						setImgFile={setImgFile}
					/>
					<div
						onClick={handleModalChange}
						className="
						w-full h-32 m-12 text-center flex flex-row justify-center items-center space-x-4">
						<span className="cursor-pointer">
							Click here to learn more about the Palette Pal project
						</span>
					</div>
					{showModal && (
						<div
							className="
						absolute bg-black w-full h-full flex flex-row items-center">
							<div
								onClick={handleModalChange}
								className="
								absolute top-0 right-0 m-12 cursor-pointer">
								<Close size="1.5em" />
							</div>
							<div className="flex flex-col items-center justify-center px-12 text-left h-full">
								<h1 className="text-2xl mb-10">About Palette Pal</h1>
								<div className="p-2 h-4/5 rounded overflow-scroll">
									<p>
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Rem, magni temporibus. Adipisci facere tempora sit. Veniam
										dolorum iure explicabo, cupiditate deserunt modi ullam,
										facilis, perspiciatis molestiae veritatis dolorem blanditiis
										deleniti? Veritatis error quae ab sed culpa iusto mollitia
										molestias necessitatibus voluptates odit officiis inventore
										qui, quibusdam sint! Fuga impedit earum pariatur ipsum illum
										tempore voluptas totam placeat voluptatem iure nostrum quos
										esse aliquam corporis, delectus nisi modi cum laborum
										officia odio assumenda corrupti qui vitae cupiditate?
										Molestias explicabo perferendis adipisci illum repudiandae
										impedit voluptatibus iste dignissimos delectus rerum,
										voluptatem tenetur eius earum eum labore unde, deserunt nemo
										fugiat natus totam aliquid. Recusandae quidem ipsam porro
										commodi soluta autem consectetur, neque fugiat quae hic
										ipsum odio provident sit ipsa cupiditate ad quaerat atque
										exercitationem nostrum adipisci. Corrupti impedit,
										laudantium distinctio vero incidunt aperiam asperiores
										excepturi, ipsa maiores sed atque, laboriosam voluptate
										quibusdam assumenda in. Distinctio vero beatae corrupti, sed
										quas excepturi a placeat accusamus, veniam sapiente eius.
										Alias exercitationem itaque eaque labore perspiciatis ut?
										Aliquid tenetur, perspiciatis nam possimus veritatis culpa
										dolorem deleniti molestiae placeat minus nemo! Quia soluta
										sit veniam iste provident nemo eum dolor quas voluptatem,
										ducimus itaque facere labore exercitationem quae placeat
										suscipit porro architecto consequatur explicabo ipsa
										voluptatibus illum asperiores cupiditate? Laudantium
										incidunt consequuntur magnam reiciendis harum rem numquam
										delectus velit ut debitis? Possimus rem vitae architecto
										iusto alias minus obcaecati nemo eum explicabo officia, a
										optio perspiciatis quo provident quidem consequatur magnam
										commodi modi assumenda, ex maxime. Quos quis nobis
										dignissimos voluptates in iure, laborum similique recusandae
										numquam suscipit at pariatur delectus necessitatibus quidem
										aliquid sed, vel repudiandae voluptate nesciunt nulla ullam
										provident dolor possimus laudantium! Omnis facilis illo
										mollitia est adipisci totam dolorem nesciunt laborum vero
										expedita, necessitatibus in ipsa ab voluptatibus quae libero
										laudantium obcaecati saepe voluptate quidem. Sapiente atque
										possimus ea mollitia iure dolor, incidunt modi voluptas enim
										sed. Ab vel dolores in id? Optio quaerat nobis architecto
										voluptatem accusantium quas voluptatibus odit reiciendis
										voluptatum ut quae, harum quis perferendis error assumenda
										odio commodi est similique alias, eaque illum sapiente ab!
										Omnis, nam quis? Quidem expedita, dignissimos quis a
										cupiditate velit suscipit eum dolor, perspiciatis dolorum
										sequi cum consequuntur harum, consectetur mollitia optio
										perferendis? Fugit, nam fugiat! Rem corrupti est voluptatem
										quisquam exercitationem perspiciatis error impedit ducimus
										dolor quis mollitia beatae enim, quibusdam ullam sunt
										numquam, totam explicabo sed aut. Sunt illum saepe sit ea
										culpa, tempore nemo voluptatem, veritatis, velit ullam sed
										nesciunt? Maiores corporis expedita cum sunt voluptatem
										earum mollitia nulla ipsum doloribus sint placeat modi,
										atque voluptates sequi reiciendis, animi quam nihil quasi
										officiis totam ea. Accusamus rem harum numquam ea? Sit ex
										libero voluptatem et iusto. Ea, debitis voluptatibus? Facere
										molestias maiores voluptatum atque eaque quasi dolores
										consequuntur nobis eius facilis illo nihil saepe eum
										voluptates magni, incidunt impedit eos reprehenderit
										pariatur culpa quibusdam enim eveniet nisi quidem! Sed,
										consequuntur cumque sunt sint ab ducimus hic mollitia
										voluptatibus et. Numquam inventore laborum, distinctio,
										rerum nam est libero quos sunt similique, at suscipit illo
										quasi alias tempore ex officiis laudantium.
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Landing;
