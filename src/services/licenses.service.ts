import { HttpException } from '@exceptions/HttpException';
import { License } from '@interfaces/licenses.interface';
import licenseModel from '@models/licenses.model';
import { isEmpty } from '@utils/util';
import { CreateLicenseDto, UpdateLicenseDto } from '@/dtos/licenses.dto';

class LicenseService {
  public licenses = licenseModel;

  public async findAllLicense(): Promise<License[]> {
    const licenses: License[] = await this.licenses.find();
    return licenses;
  }

  public async findLicenseByPhone(phone: string): Promise<License> {
    if (isEmpty(phone)) throw new HttpException(400, 'LicenseId is empty');

    const findLicense: License = await this.licenses.findOne({ phone });
    if (!findLicense) throw new HttpException(409, "License doesn't exist");

    return findLicense;
  }

  public async createTrailLicense(licenseData: CreateLicenseDto): Promise<License> {
    if (isEmpty(licenseData)) throw new HttpException(400, 'licenseData is empty');

    const findLicense: License = await this.licenses.findOne({ phone: licenseData.phone });
    if (findLicense) throw new HttpException(409, `This phone ${licenseData.phone} already license`);

    const createLicenseData: License = await this.licenses.create({ ...licenseData, status: 'trial' });

    return createLicenseData;
  }

  public async updateLicense(id: string, licenseData: UpdateLicenseDto): Promise<License> {
    if (isEmpty(licenseData)) throw new HttpException(400, 'licenseData is empty');

    const findLicense: License = await this.licenses.findByIdAndUpdate(id);

    if (licenseData.status == 'activate') {
      findLicense.status = 'active';
      findLicense.activatedOn = new Date();
      const updateUserById: License = await this.licenses.findByIdAndUpdate(id, findLicense);
      if (!updateUserById) throw new HttpException(409, "License doesn't exist");

      const updatedLicense: License = await this.licenses.findByIdAndUpdate(id);
      return updatedLicense;
    }
    return findLicense;
  }

  public async deleteLicense(id: string): Promise<License> {
    const deleteLicenseById: License = await this.licenses.findOneAndDelete({ id });
    if (!deleteLicenseById) throw new HttpException(409, "License doesn't exist");

    return deleteLicenseById;
  }
}

export default LicenseService;
