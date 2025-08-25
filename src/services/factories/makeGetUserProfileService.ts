import { makeGetUserBasicProfileService } from "./makeGetUserBasicProfileService";
import { makeGetUserActivityHistoryService } from "./makeGetUserActivityHistoryService";
import { GetUserProfileService } from "../users/getUserProfileService";

export function makeGetUserProfileService() {
	const getUserBasicProfileService = makeGetUserBasicProfileService();
	const getUserActivityHistoryService = makeGetUserActivityHistoryService();
	
	const getUserProfileService = new GetUserProfileService(
		getUserBasicProfileService,
		getUserActivityHistoryService,
	);

	return getUserProfileService;
}
