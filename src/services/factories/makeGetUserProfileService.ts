import { GetUserProfileService } from "../users/getUserProfileService";
import { makeGetUserActivityHistoryService } from "./makeGetUserActivityHistoryService";
import { makeGetUserBasicProfileService } from "./makeGetUserBasicProfileService";

export function makeGetUserProfileService() {
	const getUserBasicProfileService = makeGetUserBasicProfileService();
	const getUserActivityHistoryService = makeGetUserActivityHistoryService();

	const getUserProfileService = new GetUserProfileService(
		getUserBasicProfileService,
		getUserActivityHistoryService,
	);

	return getUserProfileService;
}
